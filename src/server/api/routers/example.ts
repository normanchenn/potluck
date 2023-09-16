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

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  // returns the current user id's (or, optionally, the passed user id's) ingredients
  getIngredients: protectedProcedure
    .input(z.object({ id: z.optional(z.string()) }))
    .query(({ ctx, input: { id } }) => {
      return ctx.db.user.findUnique({
        where: {
          id: id ?? ctx.session.user.id
        }
      })
    }),

  updateIngredients: protectedProcedure
    .input(z.object({ ingredients: z.string() }))
    .query(({ ctx, input: { ingredients } }) => {
      ctx.db.user.update
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          ingredients
        }
      })
    }),
});
