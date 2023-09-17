import { useState, useEffect } from "react";

interface RecipeImageGeneratorProps {
  word: string;
}

const RecipeImageGenerator: React.FC<RecipeImageGeneratorProps> = ({
  word,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/photos/random?query=${word}&client_id=hfOVqzH3Mpfj1taFt4DI4DO0k_hBwZXCNQaJHPFSDy8`,
    )
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.urls.regular;
        setImageUrl(imageUrl);
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, [word]);

  return (
    <img
      className="w-200 h-48 object-cover"
      src={imageUrl}
      alt={`Image for ${word}`}
    />
  );
};

export default RecipeImageGenerator;
