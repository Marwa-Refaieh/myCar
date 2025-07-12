import React , {useState} from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import DeleteConfirmationModal from "./deleteProfileConfirm";
import useFetchProfile from "@/hooks/getProfile";
import { baseUrl } from "@/baseUrl";
import axios from "axios";
import { useTranslation } from 'react-i18next';
const ProfileCard = ({
  image,
  username,
  following,
  followers,
  rating, 
  reviews, 
}) => {

  const { data, loading, error } = useFetchProfile();
  const [showModal, setShowModal] = useState(false);
  const [loadingerr, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorerr, setError] = useState("");
  const { t, i18n } = useTranslation('settingpage');

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  if (loading) return <div className="w-fit  block mx-auto  h-40">
  <div className="flex gap-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
  </div>
</div>


  if(error) return <p className='block text-red-800 font-bold mx-auto w-fit'>{error}</p>

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("يجب تسجيل الدخول أولاً.");
      return;
    }

    // const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه.");
    // if (!confirmDelete) return;

    setLoading(true);
    setError("");

    try {
      await axios.delete(`${baseUrl}api/auth/me/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // عند النجاح
      setShowSuccess(true);
      localStorage.removeItem("token");

      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "حدث خطأ أثناء حذف الحساب.");
    } finally {
      setLoading(false);
    }
  };

    
  return (
    <div className="bg-black text-white rounded-xl p-6 w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">{t('My Profile')}</h2>
      <img
        src={data.image_url} 
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full border-4 border-white mb-3"
      />
      <p className="text-lg font-semibold">@{data.username}</p>

      <div className="flex justify-center gap-6 my-3">
        <div>
          <p className="font-bold text-lg">{data.following}</p>
          <p className="text-sm text-gray-400">{t('Following')}</p>
        </div>
        <div>
          <p className="font-bold text-lg">{data.followers}</p>
          <p className="text-sm text-gray-400">{t('Followers')}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 text-yellow-400 mb-2">
        {"★".repeat(Math.floor(data.rating))}
        {"☆".repeat(5 - Math.floor(data.rating))}
        <span className="text-white ml-2">{data.rating.toFixed(1)}</span>
      </div>

      <p className="text-gray-400 text-sm mb-4">({data.reviews_count} {t('Reviews')})</p>

      <div className="flex justify-center gap-4">
        <Link to={'/editprofile'}>
        <button
        className='bg-yellow-400 inline-block text-black py-1 md:py-3 w-fit px-3 md:px-10 font-bold rounded-full hover:bg-yellow-500 transition uppercase '
      >
        {t('EDIT PROFILE')}
      </button>
        </Link>
        <button
        className='bg-red-700 inline-block text-white py-1 md:py-3 w-fit px-3 md:px-10 font-bold rounded-full hover:bg-red-800 transition uppercase '
        onClick={handleDeleteAccount}
        disabled={loadingerr}
      >
        {loadingerr ? t('delete..') : t('delete account')}
      </button>
              {showModal && (
        <DeleteConfirmationModal name={username} image={image} onClose={() => setShowModal(false)} />
        )}
      </div>
            {/* ✅ نافذة نجاح */}
            {showSuccess && (
        <div className="fixed top-[50%] left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg z-50">
          ✅ {t('The account has been successfully deleted.')}
        </div>
      )}

      {/* ❌ رسالة خطأ */}
      {error && (
        <div className="mt-3 text-red-500 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;









