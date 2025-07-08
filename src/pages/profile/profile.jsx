import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StarRatings from 'react-star-ratings';
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import img from "../../assets/image.webp";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function Profile() {
  const { t, i18n } = useTranslation("home");
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleShareProfileClick = async () => {
    const origin = window.location.origin; 
    const path = window.location.pathname; 
    const fullUrl = `${origin}${path}`;

    if (navigator.share) {
      await navigator.share({
        title: "صفحتي الشخصية",
        text: "تفقد ملفي الشخصي هنا:",
        url: fullUrl,
      });
    } else {
      await navigator.clipboard.writeText(fullUrl);
      alert("✅ تم نسخ رابط الصفحة الشخصية إلى الحافظة");
    }
  };


  useEffect(() => {
    axios.get(`https://mycarapplication.com/api/auth/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching seller data", err);
        setError("Failed to load seller data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, token]);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center min-h-[90vh]">
          <div className="flex gap-2">
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
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-Myprimary shadow-md object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className={`flex-1 space-y-4 text-center ${i18n.language === 'en' ? 'md:text-left' : 'md:text-right'}`}>
          <h2 className="text-2xl md:text-3xl font-bold">@{user.username}</h2>

          <div className="flex gap-6 justify-center md:justify-start text-sm text-gray-400">
            <span><strong>{user.following}</strong> {t("Following")}</span>
            <span><strong>{user.followers}</strong> {t("Followers")}</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-1">
            <StarRatings
              rating={user.rating || 0}
              starRatedColor="#F1EA28"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="2px"
            />
            <span className="ml-2 text-sm text-gray-400">
              {user.rating || 0} ({user.reviews_count || 0} {t("Reviews")})
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
            <Link to={'/editprofile'}>
              <button className='border border-Myprimary hover:border-primaryHover text-Myprimary  transition rounded-full px-6 py-1 capitalize'>
                edit Profile
              </button>
            </Link>

            <button onClick={handleShareProfileClick} className='border text-black hover:bg-primaryHover bg-Myprimary rounded-full px-6 py-1  border-none capitalize transition'>
              Share Profile
            </button>

          </div>

        </div>
      </div>

      <ProfileTabs cars={user.cars || []} reviews={user.reviews || []} userId={user.id} />
    </motion.div>
  );
}
