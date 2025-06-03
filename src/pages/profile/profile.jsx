import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StarRatings from 'react-star-ratings';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import ReportModal from "@/components/ReportModal";
import { useTranslation } from "react-i18next";
import img from "../../assets/image.webp";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function Profile() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("home");
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("token");


  useEffect(() => {

    axios.get(`https://mycarapplication.com/api/auth/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        setUser(res.data);
        setIsFollowing(res.data.is_follow || false);
        setIsFavorite(res.data.is_favorite || false);      
      })
      .catch((err) => {
        console.error("Error fetching seller data", err);
        setError("Failed to load seller data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, token]);

  const handleFollowToggle = () => {

    if (!token) {
      navigate("/signin");
      return;
    }

    // axios.post(
    //   "https://mycarapplication.com/api/follow/toggle",
    //   { seller_id: seller.id },
    //   { headers: { Authorization: `Bearer ${token}` } }
    // )
    //   .then((response) => {
    //     console.log("Follow toggle response:", response.data);

    //     setIsFollowing(response.data.is_following);
    //     setSeller(prevSeller => ({
    //       ...prevSeller,
    //       followers: response.data.is_following
    //         ? prevSeller.followers + 1
    //         : prevSeller.followers - 1
    //     }));
    //   })
    //   .catch((err) => {
    //     console.error("Follow toggle error", err);
    //   });
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center min-h-[90vh]">
          <div className="flex space-x-2">
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>

    );
  }

  if (error) {
    return (
      <div>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <p className="text-center text-red-500 text-3xl">{error}</p>
        </div>
      </div>
    );
  }
  if (!user) return <div className="text-white text-center mt-10">No seller data.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut" }}
      className="bg-[#040403] text-white pt-28 max-w-7xl mx-auto px-4"
    >
      <div className="pb-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-shrink-0">
          <img
            src={user.image_url || img}
            alt={user.full_name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-500 shadow-md object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className={`flex-1 space-y-4 text-center ${i18n.language === 'en' ? 'md:text-left' : 'md:text-right'}`}>
          <h2 className="text-2xl md:text-3xl font-bold">@{user.username}</h2>
          {/* <p className="text-gray-400">{user.bio}</p> */}
          {/* <p className="text-gray-400">{user.city?.name}</p> */}

          <div className="flex gap-6 justify-center md:justify-start text-sm text-gray-400">
            <span><strong>{user.following}</strong> {t("Following")}</span>
            <span><strong>{user.followers}</strong> {t("Followers")}</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-1">
            <StarRatings
              rating={user.rating || 0}
              starRatedColor="#facc15"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="2px"
            />
            <span className="ml-2 text-sm text-gray-400">
              {user.rating || 0} ({user.reviews_count || 0} {t("Reviews")})
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
            <ReportModal
              sellerId={user.id}
              triggerText={t("Report")}
              title={t("Report user")}
              placeholder={t("Write the reason for reporting this user...")}
            />

            <Button
              onClick={handleFollowToggle}
              className="text-black hover:bg-primaryHover bg-Myprimary"
            >
              {isFollowing ? t("Unfollow") : t("Follow")}
            </Button>

            {/* <LikeButton
              itemType="user"
              itemId={user.id}
              isFavorite={isFavorite}
            /> */}
          </div>
        </div>
      </div>

      <ProfileTabs cars={user.cars || []} reviews={user.reviews || []} userId={user.id} />
    </motion.div>
  );
}
