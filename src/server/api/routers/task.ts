import { and, eq, gte, desc } from "drizzle-orm";
import { z } from "zod";
import { startOfMonth } from "date-fns";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { tasks, users } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  getAllMonthly: protectedProcedure.query(async ({ ctx }) => {
    const startMonth = startOfMonth(new Date());

    const myTasks = await ctx.db
      .select()
      .from(tasks)
      .orderBy(desc(tasks.createdAt))
      .leftJoin(users, eq(tasks.createdById, users.id))
      .where(
        and(
          eq(tasks.createdById, ctx.session.user.id),
          gte(tasks.createdAt, startMonth),
        ),
      );

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
