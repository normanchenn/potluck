import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { signIn, signOut, useSession } from "next-auth/react";
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
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function home() {
  const router = useRouter();

  const session = useSession();
  // const user = api.example.getIngredients.useQuery({ id: session.data?.user.id });
  const user = api.example.getIngredients.useQuery();
  console.log("USER", user.data);

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, [session.data?.user]);

  return (
    <div>
      <Navbar />
      <div className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FCD19C] to-[#FCD19C] ">
        <Card className="mb-10 mt-10 w-[350px]">
          <CardHeader>
            <CardTitle>Chef Details</CardTitle>
            <CardDescription>Modify your account details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
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
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
        <BottomNav />
      </div>
    </div>
  );
}
