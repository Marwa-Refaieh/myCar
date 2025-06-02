import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import logo from '../../assets/logo.png';
import { baseUrl } from "@/baseUrl";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  mobile: z
    .string()
    .min(8, "Phone number is too short")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

export default function Signin2() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      mobile: data.mobile,
      fcm_token: "web",
      token: data.mobile, // ✅ نفس قيمة phone
    };
    try {
      // Replace with your backend endpoint
      const response = await axios.post(`${baseUrl}api/auth/login-with-otpless`, payload);
      // console.log("Login Success:", response.data);
      localStorage.setItem('token' , response.data.token)
      localStorage.setItem('user_id' , response.data.user.id)
      if(response.data.user.status == null){
        navigate('/completeinfo')
      }else{
        navigate('/')
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      {/* Logo */}
      <div className="mb-6">
        <img src={logo} alt="Car Logo" className="w-24 h-24 mx-auto" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-2">Hello !</h1>
      <p className="text-sm text-gray-400 mb-6">Please enter your account here</p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Enter phone number"
          className="w-full px-4 py-3 rounded-full bg-gray-900 border border-gray-700 text-black placeholder-gray-500 focus:outline-none"
          {...register("mobile")}
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

      
      {isSubmitting ? <div className="absolute bg-black w-full h-full flex justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
    <div className="flex space-x-2">
        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
    </div>
</div> :         <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-400 text-black py-3 rounded-full font-semibold"
        >
          go
        </button>}

      </form>


    

    </div>
  );
}
