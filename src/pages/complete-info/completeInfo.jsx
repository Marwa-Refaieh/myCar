import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import logo from '../../assets/logo.png';
import { baseUrl } from "@/baseUrl";
import { useNavigate } from "react-router-dom";

// Zod schema
const schema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  image: z.any().refine((file) => file?.length > 0, "Image is required"),
});

export default function CompleteInfo() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [submitError, setSubmitError] = useState(""); // Error message

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitError(""); // Reset error
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("username", data.username);
    formData.append("image", data.image[0]);

    try {
      await axios.post(`${baseUrl}api/auth/complete-info`, formData, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/');
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
      setSubmitError(msg);
    }
  };

  const selectedFile = watch("image");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="flex space-x-2">
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
          </div>
        </div>
      )}

      {/* Logo */}
      <div className="">
        <img src={logo} alt="Car Logo" className="max-w-[100%] max-h-[100%] mx-auto" />
      </div>

      <h1 className="text-2xl font-semibold mb-2">Hello !</h1>
      <p className="text-sm text-gray-400 mb-6">Please enter your account here</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-full bg-gray-900 border border-gray-700 text-black placeholder-gray-500"
          {...register("full_name")}
        />
        {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}

        {/* Username */}
        <input
          type="text"
          placeholder="User Name"
          className="w-full px-4 py-3 rounded-full bg-gray-900 border border-gray-700 text-black placeholder-gray-500"
          {...register("username")}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

        {/* Image Upload */}
        <label className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-gray-900 border border-gray-700 text-white cursor-pointer">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16l4-4a2 2 0 012.83 0L13 16m0 0l4-4a2 2 0 012.83 0l4 4M13 16V4" />
          </svg>
          <span>{selectedFile?.[0]?.name || "Choose image"}</span>
          <input type="file" className="hidden" {...register("image")} accept="image/*" />
        </label>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        {/* Submit Error */}
        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-Myprimary text-black py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-200"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
