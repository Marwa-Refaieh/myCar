import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { baseUrl } from '@/baseUrl';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    axios.get(`${baseUrl}api/car-features/get-cities`)
      .then(res => setCities(res.data.data))
      .catch(() => setErrorMsg('⚠️ Failed to load cities.'));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === 'image' ? value[0] : value);
    });

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${baseUrl}api/auth/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setSuccessMsg('✅ Profile updated successfully!');
      navigate('/')
      reset();
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || '❌ Error updating profile.');
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div className="w-fit  block mx-auto mt-32  h-40">
  <div className="flex space-x-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
  </div>
</div>
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mt-36 mx-auto p-6 bg-black text-black rounded-lg shadow-lg space-y-4">
      <h2 className="text-center text-yellow-400 text-2xl font-bold mb-4">Update Profile</h2>

      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
      {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

      <input {...register("full_name")} placeholder="Full Name" className="w-full p-2 bg-gray-800 rounded" />
      <input {...register("username")} placeholder="Username" className="w-full p-2 bg-gray-800 rounded" />
      <input {...register("national_number")} placeholder="National Number" className="w-full p-2 bg-gray-800 rounded" />
      <input {...register("address")} placeholder="Address" className="w-full p-2 bg-gray-800 rounded" />

      <select {...register("city_id")} className="w-full p-2 bg-gray-800 rounded">
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>{city.name}</option>
        ))}
      </select>

      <input type='date' {...register("birth_date")} className="w-full p-2 bg-gray-800 rounded" />
      <input type="email" {...register("email")} placeholder="Email" className="w-full p-2 bg-gray-800 rounded" />
      <textarea {...register("bio")} placeholder="Bio" className="w-full p-2 bg-gray-800 rounded" />

      <select {...register("gender")} className="w-full p-2 bg-gray-800 rounded">
        <option value="">Select Gender</option>
        <option value="1">Male</option>
        <option value="2">Female</option>
      </select>

      <input {...register("image")} type="file" className="w-full p-2 bg-gray-800 rounded" />

      <div className="flex justify-between mt-4">
        <button type="button" className="bg-transparent border border-yellow-400 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-black">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'} text-black`}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
