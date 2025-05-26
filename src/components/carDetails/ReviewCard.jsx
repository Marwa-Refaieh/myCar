import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarRatings from 'react-star-ratings';
import CommentModal from '../CommentModal';
import img from '../../assets/image.webp';

const ReviewCard = ({ reviews = [] }) => {
    const { t } = useTranslation('home');
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        setOpen(false);
        setComment("");
    };

    return (
        <div>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} className="border-b border-white/50 p-6 text-zinc-400">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div>
                                <img
                                    src={review.user?.image_url || {img}}
                                    alt={review.user?.full_name || "User"}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 sm:items-center">
                                    <h3 className="text-lg font-semibold text-zinc-100">
                                        {review.user?.full_name || t("Anonymous")}
                                    </h3>
                                    <span className="text-sm">{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-2 sm:mt-3">
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
                        <p className="mt-4 sm:ml-24 text-sm sm:w-[60%] w-full">{review.comment}</p>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-400 py-8 space-y-4">
                    <p>{t("No reviews yet")}</p>
                    <button
                        onClick={() => setOpen(true)}
                        className="inline-block font-bold rounded-full bg-Myprimary text-black transition uppercase px-10 py-2 hover:bg-primaryHover"
                    >
                        {t("Add comment")}
                    </button>
                </div>
            )}

            {reviews.length > 0 && (
                <div className="flex">
                    <button
                        onClick={() => setOpen(true)}
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
