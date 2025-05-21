import { useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";

export default function LikeButton({ itemType, itemId, initialLiked = false }) {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;

    setLoading(true);

    axios.post("/api/like", { itemType, itemId })
      .then(() => {
        setLiked(true);
      })
      .catch((error) => {
        console.error("Error liking:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <button onClick={handleClick} disabled={loading} aria-label="Like" className="hove:bg-transparent">
      <Heart
        className={`w-5 h-5 ${
          liked ? "text-yellow-400 animate-heartbeat-glow" : "animate-heartbeat-glow hove:bg-transparent"
        }`}
        fill={liked ? "#F1EA28" : "none"}
      />
    </button>
  );
}
