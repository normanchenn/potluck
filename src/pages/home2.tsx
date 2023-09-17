import { ChangeEventHandler, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { api } from "~/utils/api";

export default function home() {
  const [myfile, setFile] = useState<File | undefined | null>();
  const update = { ingredients: "" }
  const { refetch: store } = api.example.updateIngredients.useQuery(update, { enabled: false })

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

  return <>
    <Input type="file" onChange={onSelectFile} />
    <Button onClick={predict}>My Button</Button>
  </>;
}
