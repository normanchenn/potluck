import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/utils/api";
import Navbar from "../components/navbar";
import BottomNav from "../components/bottomNav";
import RecipeImageGenerator from "../components/recipeImageGenerator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { User } from "@prisma/client";

export default function home() {
  // const user = api.example.getIngredients.useQuery({ id: session.data?.user.id });
  const me = api.example.getIngredients.useQuery({});

  const peer: User = {
    id: "9c80ae98-fe3a-4020-864a-e39024ed5bfe",
    name: "Gordon Ramsay",
    image:
      "https://yt3.googleusercontent.com/bFpwiiOB_NLCVsIcVQ9UcwBjb1RzipnMmtNfLSWpeIaHboyGkBCq4KBitmovRbStk9WvIWIZOyo=s900-c-k-c0x00ffffff-no-rj",
    ingredients: JSON.stringify([
      "lamb sauce",
      "beef",
      "rice",
      "salt",
      "green pepper",
    ]),
    email: null,
    emailVerified: null
  };

  const allIngredients =
    peer?.ingredients && me.data?.ingredients
      ? JSON.parse(me.data?.ingredients ?? "[]").concat(
          JSON.parse(peer.ingredients),
        )
      : [];
  const r = api.example.getRecipes.useQuery({ ingredients: allIngredients });
  const recipes: string[] = r.data?.generations[0].text.split(", ");
  const recipe = recipes?.length > 0 ? recipes[0] : null;

  return (
    <div>
      <Navbar />
      {/* {JSON.stringify(r)} */}
      <div className=" flex h-screen min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FCD19C] to-[#FCD19C] ">
        <Card className="mb-10 mt-10 w-[350px]">
          <CardHeader>
            <CardTitle>What's Cooking?</CardTitle>
            <CardDescription>
              Find your next great potluck with a click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex flex-row">
                    <Avatar className="mr-5 mt-1">
                      <AvatarImage src="/gordan.jpg" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>It's a Match!</CardTitle>
                      <Label htmlFor="name">{!r.isLoading ? `${recipe ?? 'nothing'} with Chef Ramsay` : 'Loading...'}</Label>
                    </div>
                  </div>
                  {!r.isLoading && <RecipeImageGenerator word={recipe} />}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cook</Button>
            <Button>Next</Button>
          </CardFooter>
        </Card>
        <BottomNav />
      </div>
    </div>
  );
}
