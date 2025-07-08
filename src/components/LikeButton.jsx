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

    const url = liked
      ? "https://mycarapplication.com/api/favorites/remove"
      : "https://mycarapplication.com/api/favorites/add";

    const payload = liked
      ? { car_id: itemId } 
      : {
          rateable_type: itemType, 
          rateable_id: itemId,
        };

    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLiked(!liked);
      })
      .catch((error) => {
        console.error(
          "Error toggling favorite:",
          error.response?.data?.message || error.message
        );
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
      className="hover:bg-transparent flex items-center justify-center rounded-full"
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-t-transparent border-Myprimary rounded-full animate-spin inline-block"></span>
      ) : (
        <Heart
          className="w-5 h-5 transition-colors duration-300 text-Myprimary"
          fill={liked ? "#F1EA28" : "none"}
        />
      )}
    </button>
  );
}
