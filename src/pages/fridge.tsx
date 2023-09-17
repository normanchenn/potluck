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
import { useState, useEffect, ChangeEventHandler } from "react";
import Image from "next/image"

export default function Home() {
  const session = useSession();
  // const user = api.example.getIngredients.useQuery({ id: session.data?.user.id });
  const user = api.example.getIngredients.useQuery({});
  // const user = api.example.getIngredients.useQuery();
  // console.log("USER", user.data);
  const update = { ingredients: "" }
  const { refetch: store } = api.example.updateIngredients.useQuery(update, { enabled: false })
  const [myfile, setFile] = useState<File | undefined | null>();
  const onSelectFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setFile(e.target.files ? e.target.files[0] : null);
  }

  const predict = async () => {
    if (!myfile) {
      return
    }

    var formData = new FormData();
    formData.append("file", myfile)
    const result = await fetch("http://localhost:8000/predict/", {
      method: 'POST',
      body: formData
    })

    let prediction = await result.json()
    update.ingredients = JSON.stringify(prediction.ingredients)
    await store()
  }


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
            {/* <Image src={URL.createObjectURL(myfile)} alt="Image" className="w-1/2 rounded-md object-cover" /> */}
            {
              myfile && <img src={URL.createObjectURL(myfile)} className="px-8 rounded-md object-cover"/>
            }
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Input type="file" onChange={onSelectFile}/>
            <Button onClick={predict}>Add</Button>
          </CardFooter>
        </Card>
        <BottomNav />
      </div>
    </div>
  );
}
