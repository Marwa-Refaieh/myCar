import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StarRatings from 'react-star-ratings';
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import car from '../../assets/home/car1.webp';
import ReportModal from "@/components/ReportModal";
import SellerTabs from "@/components/SellerProfile/SellerTabs";
import { useParams } from "react-router-dom";

export default function SellerProfile() {
    const param = useParams()
    const id = param.id

    const [seller, setSeller] = useState(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fakeSeller = {
            id: 11,
            name: "name_y",
            avatarUrl: "/avatar.jpg",
            followingCount: 14,
            followerCount: 1900,
            rating: 3.5,
            reviewsCount: 230,
            isLiked: false,
            isFollowing: true,
        };

        const fakeCars = [
            {
                id: 1,
                name: "Toyota Corolla 2021",
                image: car,
                kilometers: 60000,
                year: 2021,
                transmission: "Automatic",
                location: "Damascus",
                price: 17000,
                rating: 4.9,
            },
            {
                id: 2,
                name: "Hyundai Elantra 2020",
                image: car,
                kilometers: 45000,
                year: 2020,
                transmission: "Manual",
                location: "Aleppo",
                price: 14500,
                rating: 4.7,
            },
        ];

        setTimeout(() => {
            setSeller(fakeSeller);
            setCars(fakeCars);
            setIsFollowing(fakeSeller.isFollowing);
            setLoading(false);
        }, 800);
    }, []);

    const handleFollowToggle = () => {
        const actionUrl = isFollowing
            ? `/api/unfollow/${seller.id}`
            : `/api/follow/${seller.id}`;

        axios.post(actionUrl)
            .then(() => {
                setIsFollowing(!isFollowing);
            })
            .catch((err) => {
                console.error("Error toggling follow state:", err);
            });
    };

    const handleReport = (reason) => {
        const reportUrl = "/api/report";

        axios.post(reportUrl, { reason })
            .then(response => {
                console.log("Report submitted successfully:", response.data);
            })
            .catch(error => {
                console.error("Error submitting report:", error);
            });
    };

    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
    if (!seller) return <div className="text-white text-center mt-10">No seller data.</div>;

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
                        src={seller.avatarUrl}
                        alt={seller.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-500 shadow-md object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold">@{seller.name} {id}</h2>

                    <div className="flex gap-6 justify-center md:justify-start text-sm text-gray-400">
                        <span><strong>{seller.followingCount}</strong> Following</span>
                        <span><strong>{seller.followerCount}</strong> Followers</span>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-1">
                        <StarRatings
                            rating={seller.rating}
                            starRatedColor="#facc15"
                            numberOfStars={5}
                            starDimension="16px"
                            starSpacing="2px"
                        />
                        <span className="ml-2 text-sm text-gray-400">
                            {seller.rating} ({seller.reviewsCount} Reviews)
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                        <ReportModal
                            triggerText="Report"
                            title="Report Seller"
                            placeholder="Write the reason for reporting this seller..."
                            onSubmit={handleReport}
                        />

                        <Button
                            onClick={handleFollowToggle}
                            className="text-black hover:bg-primaryHover bg-Myprimary"
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>

                        <LikeButton
                            itemType="seller"
                            itemId={seller.id}
                            initialLiked={seller.isLiked}
                        />
                    </div>
                </div>
            </div>

            <SellerTabs />
        </motion.div>
    );
}
