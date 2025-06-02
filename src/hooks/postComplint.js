import { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";

export default function useComplaintForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prove: null,
    date: new Date().toLocaleDateString(),
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "prove") {
      setFormData((prev) => ({ ...prev, prove: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    setSuccess(false);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("problem_date", formData.date);
    payload.append("type" , "1")
    if (formData.prove) {
      payload.append("prove", formData.prove);
    }

    try {
      await axios.post(`${baseUrl}api/complaints`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        prove: null,
        date: new Date().toLocaleDateString(),
      });
    } catch (err) {
      setSubmitError("فشل في إرسال الشكوى");
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    submitLoading,
    submitError,
    success,
  };
}
