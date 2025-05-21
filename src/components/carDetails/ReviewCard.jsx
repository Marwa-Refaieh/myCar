import image from '../../assets/image.webp';
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import CommentModal from '../CommentModal';
import StarRatings from 'react-star-ratings';

const ReviewCard = () => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        console.log("Comment submitted:", comment);
        setOpen(false);
        setComment("");
    };

    return (
        <div>
            <div className="border-b border-white/50 p-6 text-zinc-400">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                    <div>
                        <img src={image} alt="Stephen Strange" className="w-20 h-20 rounded-full" />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 sm:items-center">
                            <h3 className="text-lg font-semibold text-zinc-100">Stephen Strange</h3>
                            <span className="text-sm">2 months ago</span>
                        </div>

                        <div className="flex items-center gap-1 mt-2 sm:mt-3">
                            <StarRatings
                                rating={4.5}
                                starRatedColor="#facc15"
                                numberOfStars={5}
                                starDimension="16px"
                                starSpacing="2px"
                            />
                        </div>
                    </div>
                </div>

                <p className="mt-4 sm:ml-24 text-sm sm:w-[60%] w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>

            <button
                onClick={() => setOpen(true)}
                className="inline-block font-bold rounded-full bg-Myprimary text-black transition uppercase px-10 py-2 mt-5 hover:bg-primaryHover"
            >
                Add comment
            </button>

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