import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { api } from "~/utils/api";

export default function home() {
  const session = useSession();
  // const user = api.example.getIngredients.useQuery({ id: session.data?.user.id });
  const user = api.example.getIngredients.useQuery();
  console.log("USER", user.data);

  // console.log(session.data?.user.id)
  const myFunc = () => {
    console.log("hi there");
  }
  return <>
    <Input />
    <Button onClick={myFunc}>My Button</Button>
  </>;
}
