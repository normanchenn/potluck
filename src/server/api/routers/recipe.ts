import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const reciperRouter = createTRPCRouter({
  recipe: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findMany();
  }),

  create: publicProcedure
  .input(z.object({ 
    name: z.string()
   }))
  .query(({ ctx }) => {
    return ctx.db.recipe.create({
      data: {
        
      }
    })
  }),
});
