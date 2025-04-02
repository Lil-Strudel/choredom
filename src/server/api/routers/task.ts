import { and, eq, gte, desc, lte } from "drizzle-orm";
import { z } from "zod";
import { startOfMonth } from "date-fns";
import { TZDate } from "@date-fns/tz";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { tasks, users } from "~/server/db/schema";

function getMonthBounds(month: number, year: number) {
  if (month < 0 || month > 11) {
    throw new Error("Month must be between 0 and 11");
  }

  const timeZone = "America/Denver";

  const start = new TZDate(year, month, 1, timeZone);
  const end = new TZDate(year, month + 1, 0, timeZone);

  return {
    start: start,
    end: end,
  };
}

export const taskRouter = createTRPCRouter({
  getAllMonthly: protectedProcedure
    .input(
      z.object({
        month: z.number(),
        year: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { start, end } = getMonthBounds(input.month, input.year);

      const myTasks = await ctx.db
        .select()
        .from(tasks)
        .orderBy(desc(tasks.createdAt))
        .leftJoin(users, eq(tasks.createdById, users.id))
        .where(and(gte(tasks.createdAt, start), lte(tasks.createdAt, end)));

      return myTasks;
    }),
  getUsersMonthly: protectedProcedure.query(async ({ ctx }) => {
    const startMonth = startOfMonth(new Date());

    const myTasks = await ctx.db
      .select()
      .from(tasks)
      .orderBy(desc(tasks.createdAt))
      .where(
        and(
          eq(tasks.createdById, ctx.session.user.id),
          gte(tasks.createdAt, startMonth),
        ),
      );

    return myTasks;
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), pointValue: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        name: input.name,
        createdById: ctx.session.user.id,
        pointValue: input.pointValue,
      });
    }),
});
