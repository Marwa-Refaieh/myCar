import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReportModal({
    triggerText = "Report",       
    title = "Report Item",       
    placeholder = "Write your reason here...",
    onSubmit                  
}) {
    const [reason, setReason] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        if (!reason.trim()) {
            alert("Please enter a reason.");
            return;
        }

        if (onSubmit) {
            onSubmit(reason);
        }

        setReason("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-black hover:bg-primaryHover bg-Myprimary border-none">
                    {triggerText}
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#121212] text-white border-none">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <Textarea
                    placeholder={placeholder}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="min-h-[120px] text-white"
                />

                <DialogFooter>
                    <Button variant="destructive" onClick={handleSubmit} className="bg-Myprimary text-black hover:bg-primaryHover">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
