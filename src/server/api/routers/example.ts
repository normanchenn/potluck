import axios from "axios";
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

  getRecipes: protectedProcedure
    .input(z.object({ ingredients: z.array(z.string()) }))
    .query(async ({ input: { ingredients } }) => {
      if (ingredients.length === 0) {
        return null;
      }
      let response = await axios.post('https://api.cohere.ai/v1/generate', {
        "max_tokens": 100,
        "prompt": `What kind of recipes can you create with: \`${ingredients.join(', ')}\`? Respond with a parseable comma separated list of recipe names with NO extra explanation. Make sure I have all the ingredients for these recipes. An example would be: Fried Rice, Omelette, Grilled Cheese Sandwich, Sushi RECIPE NAMES ONLY`,
        "temperature": 5
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.COHERE_BEARER}`
        }
      })
      return response.data;
    })
});
