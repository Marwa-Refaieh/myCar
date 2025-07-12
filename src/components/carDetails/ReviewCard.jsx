import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarRatings from 'react-star-ratings';
import CommentModal from '../CommentModal';
import img from '../../assets/image.webp';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewCard = ({ reviews = [], id, type }) => {
    const { t } = useTranslation('home');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [reviewsState, setReviewsState] = useState(reviews);
    const location = useLocation();

    const handleSubmit = ({ comment, rating }) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Authentication token not found. Please login.");
            return;
        }

        const payload = {
            rateable_type: type,
            rateable_id: id,
            value: rating,
            comment: comment,
        };

        axios.post('https://mycarapplication.com/api/rates', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setOpen(false);
                setComment("");

                const newReview = {
                    id: response.data.id,
                    created_at: new Date().toISOString(),
                    value: rating,
                    comment: comment,
                    user: {
                        id: response.data.user?.id,
                        full_name: response.data.user?.full_name,
                        image_url: response.data.user?.image_url,
                    },
                };

                setReviewsState(prevReviews => {
                    const currentUserId = response.data.user?.id;

                    const existingIndex = prevReviews.findIndex(
                        review => review.user?.id === currentUserId
                    );

                    if (existingIndex !== -1) {
                        const updatedReviews = [...prevReviews];
                        updatedReviews[existingIndex] = newReview;
                        return updatedReviews;
                    } else {
                        return [newReview, ...prevReviews];
                    }
                });
            })

            .catch(error => {
                console.error("Error response:", error.response?.data);
            });
    };

    return (
        <div>
            {reviewsState.length > 0 ? (
                reviewsState.map((review) => (
                    <div key={review.id} className="border-b border-white/50 p-3 sm:p-6 text-zinc-400 ">
                        <div className="flex sm:flex-row items-start sm:items-center gap-4 ">
                            <div>
                                <img
                                    src={review.user?.image_url || img}
                                    alt={review.user?.full_name || "User"}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 sm:items-center">
                                    <h3 className="text-lg font-semibold text-zinc-100">
                                        {review.user?.full_name || t("Anonymous")}
                                    </h3>
                                    <span className="text-sm">
                                        {new Date(review.created_at).toLocaleDateString('en-US')}
                                    </span>

                                </div>
                                <div className="flex items-center gap-1">
                                    <StarRatings
                                        rating={review.value}
                                        starRatedColor="#facc15"
                                        numberOfStars={5}
                                        starDimension="16px"
                                        starSpacing="2px"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="mt-3 sm:ml-24 text-sm sm:w-[60%] w-full">{review.comment}</p>
                    </div>
                ))
            ) : (
                <div className="text-gray-400 py-8 space-y-4 flex justify-center items-center flex-col min-h-[50vh]">
                    <p>{t("No reviews yet")}</p>
                    <button
                        onClick={() => setOpen(true)}
                        className="inline-block font-bold rounded-full bg-Myprimary text-black transition uppercase px-10 py-2 hover:bg-primaryHover"
                    >
                        {t("Add comment")}
                    </button>
                </div>
            )}

            {reviewsState.length > 0 && !location.pathname.includes('profile') && (
                <div className="flex">
                    <button
                        onClick={() => {
                            const token = localStorage.getItem("token");
                            if (token) {
                                setOpen(true);
                            } else {
                                navigate('/signin');
                            }
                        }}
                        className="inline-block font-bold rounded-full bg-Myprimary text-black transition uppercase px-10 py-2 mt-5 hover:bg-primaryHover"
                    >
                        {t("Add comment")}
                    </button>
                </div>
            )}



            <CommentModal
                open={open}
                setOpen={setOpen}
                comment={comment}
                setComment={setComment}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default ReviewCard;
