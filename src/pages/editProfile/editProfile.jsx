import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { baseUrl } from '@/baseUrl';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const { t, i18n } = useTranslation('edit'); 

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
                navigate('/signin');
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
      setSuccessMsg(t('successUpdate'));
      navigate('/')
      reset();
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || t('errorUpdate'));
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
  <h2 className="text-center text-white text-xl font-bold mb-4">{t('title')}</h2>

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

  <label className="block text-sm">{t('fullName')}</label>
  <input {...register("full_name")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">{t('userName')}</label>
  <input {...register("username")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">{t('nationalNumber')}</label>
  <input {...register("national_number")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">{t('address')}</label>
  <input {...register("address")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">{t('city')}</label>
  <select {...register("city_id")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700">
    <option value="" hidden>{t('selectCity')}</option>
    {cities.map(city => (
      <option key={city.id} value={city.id}>{city.name}</option>
    ))}
  </select>

  <label className="block text-sm">{t('gender')}</label>
  <select {...register("gender")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700">
    <option value="" hidden>{t('selectCity')}</option>
    <option value="1">{t('male')}</option>
    <option value="2">{t('female')}</option>
  </select>

  <label className="block text-sm">{t('birthDate')}</label>
  <input type="date" {...register("birth_date")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">{t('email')}</label>
  <input type="email" {...register("email")} placeholder={t('emailPlaceholder')} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">{t('bio')}</label>
  <textarea {...register("bio")} placeholder={t('bioPlaceholder')} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <label className="block text-sm">{t('idImage')}</label>
  <input type="file" {...register("image")} className="w-full p-3 bg-neutral-900 text-white rounded-lg border border-neutral-700" />

  <div className="flex justify-between gap-2 pt-4">
    <button type="button" className="w-1/2 border border-Myprimary text-Myprimary py-2 rounded-lg hover:bg-Myprimary hover:text-black">
      {t('cancel')}
    </button>
    <button type="submit" className="w-1/2 bg-Myprimary text-black py-2 rounded-lg hover:opacity-90 disabled:opacity-60" disabled={loading}>
      {t('save')}
    </button>
  </div>
</form>

  );
};

export default EditProfile;
