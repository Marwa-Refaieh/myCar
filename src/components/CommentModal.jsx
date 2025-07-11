import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import StarRatings from 'react-star-ratings';
import Toast from '@/components/ui/Toast';

const CommentModal = ({ open, setOpen, comment, setComment, onSubmit }) => {
    const { t } = useTranslation('home');
    const [rating, setRating] = useState(0);
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = () => {
        if (comment.trim() === "" || rating === 0) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // اختفاؤه بعد 3 ثوانٍ
            return;
        }

        onSubmit({ comment, rating });
        setOpen(false);
        setComment("");
        setRating(0);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md bg-[#121212] border-Mycard w-[90%] md:w-full">
                    <DialogHeader>
                        <DialogTitle>{t("Add a Comment")}</DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 space-y-4">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                            className="w-full border bg-transparent rounded-md p-3 text-sm focus:outline-none border-Mycard"
                            placeholder={t("Write your comment here...")}
                        ></textarea>

                        <div className="flex justify-center">
                            <StarRatings
                                rating={rating}
                                starRatedColor="#F1EA28"
                                changeRating={setRating}
                                numberOfStars={5}
                                name="rating"
                                starDimension="28px"
                                starSpacing="4px"
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button className="text-Myprimary" variant="outline" onClick={() => setOpen(false)}>
                            {t("Cancel")}
                        </Button>
                        <Button onClick={handleSubmit} className="bg-Myprimary text-black hover:bg-primaryHover">
                            {t("Submit")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Toast show={showToast} message={t("Please enter a comment and rating")} />
        </>

    );
};

export default CommentModal;
