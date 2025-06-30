import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import logo from '../../assets/logo.png';
import { baseUrl } from "@/baseUrl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import countryCodes from '../../data/countries.js';





const schema = z.object({
  mobile: z
    .string()
    .min(8, "رقم الهاتف قصير جداً")
    .regex(/^\+?[0-9]{8,}$/, "أدخل رقمًا صحيحًا مع أو بدون اللاحقة الدولية"),
});

export default function Signin2() {
  const navigate = useNavigate();
  const [selectedCode, setSelectedCode] = useState("+966");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      mobile: data.mobile,
      fcm_token: "web",
      token: data.mobile,
    };

    try {
      const response = await axios.post(`${baseUrl}api/auth/login-with-otpless`, payload);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user.id);
      console.log(response.data);
      if (response.data.user.status == null) {
        navigate('/completeinfo');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleCodeChange = (e) => {
    const code = e.target.value;
    setSelectedCode(code);
    const currentMobile = watch("mobile")?.replace(/^\+\d{1,4}/, "") || "";
    setValue("mobile", code + currentMobile);
  };

  const { watch } = useForm();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      <div className="mb-6">
        <img src={logo} alt="Car Logo" className="mx-auto" />
      </div>

      <h1 className="text-2xl font-semibold mb-2">Hello !</h1>
      <p className="text-sm text-gray-400 mb-6">Please enter your account here</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <select
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-black px-2 py-1 rounded"
            value={selectedCode}
            onChange={handleCodeChange}
          >
            {countryCodes.map((code) => (
              <option key={code.id} value={code.dial_code}>
                 <span className="font-bold text-sm text-yellow-50">{code.code}</span> &nbsp; {code.dial_code}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="w-full pl-32 pr-4 py-3 rounded-full bg-gray-900 border border-gray-700 text-black placeholder-gray-500 focus:outline-none"
            {...register("mobile")}
          />
        </div>

        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

        {isSubmitting ? (
          <div className="absolute bg-black w-full h-full flex justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex space-x-2">
              <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-black py-3 rounded-full font-semibold"
          >
            go
          </button>
        )}
      </form>
    </div>
  );
}
