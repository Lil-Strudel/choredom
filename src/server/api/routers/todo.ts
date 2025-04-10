import { and, eq, asc } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { tasks, todos } from "~/server/db/schema";

export const todoRouter = createTRPCRouter({
  getUncompleted: protectedProcedure.query(async ({ ctx }) => {
    const myTodos = await ctx.db
      .select()
      .from(todos)
      .orderBy(asc(todos.pointValue))
      .where(
        and(
          eq(todos.createdById, ctx.session.user.id),
          eq(todos.completed, false),
        ),
      );

    return myTodos;
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), pointValue: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(todos).values({
        name: input.name,
        createdById: ctx.session.user.id,
        pointValue: input.pointValue,
      });
    }),

  completeTodo: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const [todo] = await ctx.db
        .select()
        .from(todos)
        .where(eq(todos.id, input));

      if (!todo) {
        return;
      }

      await ctx.db
        .update(todos)
        .set({ completed: true })
        .where(eq(todos.id, todo.id));

      await ctx.db.insert(tasks).values({
        name: todo.name,
        createdById: ctx.session.user.id,
        pointValue: todo.pointValue,
      });
    }),
});
