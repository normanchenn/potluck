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
      `https://api.unsplash.com/photos/random?query=${word}&client_id=3_0mEiGMOa6_w4W40iyvLNnSNUeTpj3Rvuy0Mq6zsqU`,
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
