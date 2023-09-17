import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { useEffect } from "react";

export default function home() {
  const session = useSession();
  // const user = api.example.getIngredients.useQuery({ id: session.data?.user.id });
  const user = api.example.getIngredients.useQuery({});
  // const user = api.example.getIngredients.useQuery();
  // console.log("USER", user.data);

  return (
    <div>
      <Navbar />
      <div className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FCD19C] to-[#FCD19C] ">
        <Card className="mb-10 mt-10 w-[350px]">
          <CardHeader>
            <CardTitle>Is your Fridge running?</CardTitle>
            <CardDescription>Better go catch it.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Your Ingredients</Label>
                  <Input id="name" placeholder={user?.ingredients} />
                </div>
                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Edit</Button> */}
            <Button className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <input type="file" title="Add Photo" className=""/>
            </Button>
          </CardFooter>
        </Card>
        <BottomNav />
      </div>
    </div>
  );
}
