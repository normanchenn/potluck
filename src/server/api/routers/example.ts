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
    return ctx.db.example.findMany();
  }),

  getIngredients: protectedProcedure
  .query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id
      }
    })
  }),

  updateIngredients: protectedProcedure
  .query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id
      }
    })
  }),
});
