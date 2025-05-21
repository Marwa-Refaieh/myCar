import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const schema = z.object({
  phone: z.string().min(9, 'رقم الهاتف مطلوب').regex(/^[0-9]+$/, 'رقم غير صالح'),
});

export default function Signin2() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://your-backend-api.com/api/login', data);
      console.log('تم الدخول بنجاح:', response.data);
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الدخول:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
        {/* شعار السيارة */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Car Logo" className="w-24 h-24" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Hello!</h2>
          <p className="text-gray-400">Please enter your account here</p>
        </div>

        {/* إدخال رقم الهاتف */}
        <div>
          <input
            type="text"
            placeholder="Enter phone number"
            {...register('phone')}
            className="w-full rounded-full border border-gray-600 bg-black text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* زر Go */}
    <Link to={'/code'}>
    <button
          type="submit"
          className="w-full bg-yellow-400 my-3 text-black font-bold py-3 rounded-full"
        >
          Go
        </button>
    </Link>


        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>

        {/* زر Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-full"
        >
          <FcGoogle/>
          <span>Sign in with Google</span>
        </button>

        {/* زر Facebook */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-full"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" className="w-5 h-5" />
          <span>Sign in with Facebook</span>
        </button>
      </form>
    </div>
  );
}
