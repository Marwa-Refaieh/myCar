import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CommentModal = ({ open, setOpen, comment, setComment, onSubmit }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md bg-[#121212] border-Mycard">
                <DialogHeader>
                    <DialogTitle>Add a Comment</DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="w-full border bg-transparent rounded-md p-3 text-sm focus:outline-none border-Mycard"
                        placeholder="Write your comment here..."
                    ></textarea>
                </div>

                <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button className="text-Myprimary" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} className="bg-Myprimary text-black hover:bg-primaryHover">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CommentModal;
