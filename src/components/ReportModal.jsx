import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ReportModal({
    sellerId,
    triggerText = "Report",
    title = "Report Item",
    placeholder = "Write your reason here...",
}) {
    const [reason, setReason] = useState("");
    const [open, setOpen] = useState(false);
    const { t } = useTranslation('home');
    
    const handleClick = () => {

        const token = localStorage.getItem("token");

        if (!token) {
            Navigate("/signin");
            return;
        }
        axios
            .post(
                "https://mycarapplication.com/api/reports/add",
                {
                    seller_id: sellerId,
                    report_reason: reason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log("تم الإبلاغ بنجاح:", response.data);
                setReason("");
                setOpen(false);
            })

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
                    <Button variant="destructive" onClick={handleClick} className="bg-Myprimary text-black hover:bg-primaryHover">
                        {t("Submit")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
