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

export default function home() {
  const session = useSession();
  // const user = api.example.getIngredients.useQuery({ id: session.data?.user.id });
  const user = api.example.getIngredients.useQuery();
  console.log("USER", user.data);

  return (
    <div>
      <Navbar />
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
                  <Label htmlFor="name">Name</Label>
                  <RecipeImageGenerator word="pizza" />
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
