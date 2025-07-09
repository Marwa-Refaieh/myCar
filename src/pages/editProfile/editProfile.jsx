import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { baseUrl } from '@/baseUrl';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {


  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');


  useEffect(() => {
    if (!token) {
        setUser(null)
        return;
    }
    setLoading(true);

    axios.get(`https://mycarapplication.com/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((res) => {
            setUser(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching seller data", err);
            setLoading(false);
            if (err.response?.status === 401) {
                setUser(null);
                localStorage.clear();
                navigate('/login');
            }
        });
}, [token, navigate]);






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
  <div className="flex gap-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
  </div>
</div>
  return (
<form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mt-28 mx-auto p-4 bg-black text-white rounded-xl space-y-4">
  <h2 className="text-center text-white text-xl font-bold mb-4">Personal Profile</h2>

  <div className="flex items-center gap-4">
    {user?.image_url && (
      <img
        src={user.image_url}
        alt={user.full_name}
        onLoad={() => setIsImageLoaded(true)}
        className={`w-16 h-16 object-cover rounded-full border border-gray-700 transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    )}
    <p className="text-lg">{user?.full_name}</p>
  </div>

  {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
  {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

  <label className="block text-sm">Full Name</label>
  <input {...register("full_name")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">User Name</label>
  <input {...register("username")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">National Number</label>
  <input {...register("national_number")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">Address</label>
  <input {...register("address")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">City</label>
  <select {...register("city_id")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700">
    <option value="" hidden>Select</option>
    {cities.map(city => (
      <option key={city.id} value={city.id}>{city.name}</option>
    ))}
  </select>

  <label className="block text-sm">Gender</label>
  <select {...register("gender")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700">
    <option value="" hidden>Select</option>
    <option value="1">Male</option>
    <option value="2">Female</option>
  </select>

  <label className="block text-sm">Birth Date</label>
  <input type="date" {...register("birth_date")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">Email</label>
  <input type="email" {...register("email")} placeholder="Enter Email" className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">Bio</label>
  <textarea {...register("bio")} placeholder="Enter" className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">ID Image</label>
  <input type="file" {...register("image")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <div className="flex justify-between gap-2 pt-4">
    <button type="button" className="w-1/2 border border-yellow-400 text-yellow-400 py-2 rounded-lg hover:bg-yellow-400 hover:text-black">
      Cancel
    </button>
    <button type="submit" className="w-1/2 bg-yellow-400 text-black py-2 rounded-lg hover:opacity-90 disabled:opacity-60" disabled={loading}>
      Save
    </button>
  </div>
</form>

  );
};

export default EditProfile;
