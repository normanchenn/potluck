// components/SwipeCard.tsx

interface SwipeCardProps {
  content: JSX.Element;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ content }) => {
  return (
    <div className="relative h-96 w-72 overflow-hidden rounded-lg border border-gray-300 bg-white">
      {content}
    </div>
  );
};

export default SwipeCard;
