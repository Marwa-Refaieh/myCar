import axios from "axios";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LikeButton({ itemType, itemId, isFavorite = false }) {
  const [liked, setLiked] = useState(isFavorite);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    if (loading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    setLoading(true);

    if (!liked) {
      
      axios
        .post(
          "https://mycarapplication.com/api/favorites/add",
          {
            rateable_type: itemType,
            rateable_id: itemId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setLiked(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };


  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label="Like"
      className="hover:bg-transparent"
    >
      <Heart
        className={`w-5 h-5 transition-colors duration-300 text-Myprimary`}
        fill={liked ? "#F1EA28" : "none"}
      />
    </button>

  );
}
