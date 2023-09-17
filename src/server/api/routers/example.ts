import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const router = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.session?.user;
  }),

  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  // returns the current user id's (or, optionally, the passed user id's) ingredients
  getIngredients: protectedProcedure
    .input(z.object({ id: z.optional(z.string()) }))
    .query(({ ctx, input: { id } }) => {
      return ctx.db.user.findUnique({
        where: { id: id ?? ctx.session.user.id }
      })
    }),

  // updates the current user id's (or, optionally, the passed user id's) ingredients
  updateIngredients: protectedProcedure
    .input(z.object({
      id: z.optional(z.string()),
      ingredients: z.string()
    }))
    .query(({ ctx, input: { id, ingredients } }) => {
      return ctx.db.user.update({
        where: { id: id ?? ctx.session.user.id },
        data: { ingredients }
      })
    }),
});
