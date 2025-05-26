import { useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LikeButton({ itemType, itemId, initialLiked = false }) {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (loading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    setLoading(true);

    axios
      .post("https://mycarapplication.com/api/favorites/add", {
        type: itemType,
        id: itemId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(() => {
        setLiked(true);
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء الإضافة إلى المفضلة:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label="Like"
      className="hover:bg-transparent"
    >
      <Heart
        className={`w-5 h-5 transition-colors duration-300 ${liked ? "text-yellow-400 animate-heartbeat-glow" : "text-gray-400 animate-heartbeat-glow"
          }`}
        fill={liked ? "#F1EA28" : "none"}
      />
    </button>

  );
}
