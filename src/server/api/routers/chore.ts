import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { chores } from "~/server/db/schema";

export const choreRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const chore = await ctx.db.select().from(chores);

    return chore;
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), pointValue: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(chores).values({
        name: input.name,
        pointValue: input.pointValue,
      });
    }),
});
