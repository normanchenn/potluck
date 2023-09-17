import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ChangeEventHandler, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { api } from "~/utils/api";

export default function home() {
  const me = api.example.getIngredients.useQuery({})
  // const [peer, setPeer] = useState<User | null>()

  const peer: User = {
    id: "9c80ae98-fe3a-4020-864a-e39024ed5bfe",
    name: "Gordon Ramsay",
    image: "https://yt3.googleusercontent.com/bFpwiiOB_NLCVsIcVQ9UcwBjb1RzipnMmtNfLSWpeIaHboyGkBCq4KBitmovRbStk9WvIWIZOyo=s900-c-k-c0x00ffffff-no-rj",
    ingredients: JSON.stringify([
      "lamb sauce",
      "beef",
      "rice",
      "salt",
      "green pepper"
    ])
  }

  // const { data } = api.example.getAllUsers.useQuery()
  // console.log("DATA", data)
  // if (data) {
  //   let r;
  //   do {
  //     const randIdx = Math.floor(Math.random() * (data?.length ?? 0))
  //     r = data[randIdx]
  //   } while (r?.id === session.data?.user.id)
  //   setPeer(r)
  // }

  const allIngredients = (peer?.ingredients && me.data?.ingredients) ? JSON.parse(me.data?.ingredients ?? "[]").concat(JSON.parse(peer.ingredients)) : [];
  let r = api.example.getRecipes.useQuery({ ingredients: allIngredients })
  const recipes: string[] = r.data?.generations[0].text.split(", ")

  return <>
    {recipes}
  </>;
}
