import { useForm } from "react-hook-form";
import { useState } from "react";
import StepIndicator from "../../components/car/StepIndicator";
import CarBrands from "../../components/car/carbrands";
import CarDetails from "../../components/car/cardatails";
import CarImages from "../../components/car/carimages";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { baseUrl } from "@/baseUrl";
import axios from "axios";
const CreateCarPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation('createcar');

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch, 
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = async (data) => {
    setIsLoading(true); // 🌀 بدء اللودينغ

    const formData = new FormData();
  
    // 🖼️ الصور
    if (Array.isArray(data.images)) {
      data.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images[]", file);
        }
      });
    }
  
    // 🧊 موديل 3D (اختياري)
    if (data.model3d instanceof File) {
      formData.append("model3d", data.model3d);
    }
  
    // 🎥 رابط الفيديو
    if (data.video_link) {
      formData.append("video_link", data.video_link);
    }
  
    // ✅ البيانات النصية الأخرى المطلوبة حسب ما ذكرت:
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("type", "1"); // نوع الإعلان (مثلاً: بيع)
    formData.append("price_type", "2"); // نقدًا مثلاً
    formData.append("latitude", "25");
    formData.append("longitude", "27");
    formData.append("engine_cylinder", "4");
  
    // ✅ الحقول الإضافية المطلوبة منك:
    formData.append("brand_id", data.brand_id); // ماركة السيارة
    formData.append("model_id", data.model_id); // الموديل
    formData.append("city_id", data.city_id); // المدينة
    formData.append("year_production", data.year_production); // سنة الصنع
    formData.append("transmission_type", data.transmission_type); // ناقل الحركة
    formData.append("body_type" , data.body_type)
    formData.append("fuel_type" , data.fuel_type)
    formData.append("color" , data.color)
    formData.append("doors" , data.doors)
    formData.append("seats" , data.seats)
    // ✅ الحقول العامة الموجودة في النموذج:
    formData.append("name", data.name);
    formData.append("horsepower", data.horsepower);
    formData.append("odometer", data.odometer);
    formData.append("engine_size", data.engine_size);
    formData.append("tax_and_insurance", data.tax_and_insurance);
    formData.append("price", data.price);
    formData.append("description", data.description);
  
    try {
      const response = await axios.post(`${baseUrl}api/car`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Create car Success:", response.data);
      setShowPopup(true);
setTimeout(() => {
  setShowPopup(false);
  navigate("/"); // إذا حابب تنتقل لصفحة ثانية بعد النجاح
}, 3000);

    } catch (error) {
      console.error("Create car Failed:", error.response?.data || error);
    }finally{
      setIsLoading(false); // 🛑 إيقاف اللودينغ
    }
  };
  
  const goNext = async () => {
    let valid = false;

    if (currentStep === 1) {
      valid = await trigger("brand");
    } else if (currentStep === 2) {
      valid = await trigger([
        "user_id",
        "city_id" ,
        "name" ,
        "price",
        "color",
        "model_id",
        "year_production",
        "transmission_type",
        "fuel_type",
        "body_type",
        "doors",
        "seats"
      ]);
    } else if (currentStep === 3) {
      valid = await trigger(["images", "location", "description"]);
    }

    if (valid) { 
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      console.log("إلغاء العملية");
      navigate(-1);
    }
  };

  if (isLoading) return <div className="mt-60 block w-fit mx-auto  h-40">
  <div className="flex space-x-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
  </div>
</div>

  return (
    <div className="min-h-svh">
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6 max-w-xl mx-auto">
      <StepIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <div className="flex justify-between items-center flex-wrap">
          <CarBrands
            // value={watch("brand")}
            selectBrand={(brand) => setValue("brand_id", brand)}
          />
          {errors.brand && <p className="text-red-600 mt-1">الرجاء اختيار ماركة</p>}
          <input
            type="hidden"
            {...register("brand_id", { required: true })}
          />
        </div>
      )}

      {currentStep === 2 && (
        <CarDetails register={register} errors={errors} />
      )}

      {currentStep === 3 && (
        <CarImages register={register} errors={errors} watch={watch} setValue={setValue} />
      )}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={goBack}
          className="border-Myprimary border text-Myprimary py-3 px-10 inline-block font-bold rounded-full hover:bg-primaryHover hover:text-black transition uppercase"
        >
          {currentStep === 1 ? t('cancel') : t('back')}
        </button>
 
        {currentStep < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="bg-Myprimary inline-block text-black py-3 px-10 font-bold rounded-full hover:bg-primaryHover transition uppercase"
          >
            {t('next')}
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {t('create')}
          </button>
        )}
      </div>


    </form>
{showPopup && (
  <div className="fixed w-[70%] md:w-[40%] h-28 flex justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black text-Myprimary px-6 py-3 rounded-xl shadow-md shadow-white z-50 transition-opacity duration-300">
     تم إنشاء السيارة بنجاح!
  </div>
)}
    </div>

  );
};

export default CreateCarPage;