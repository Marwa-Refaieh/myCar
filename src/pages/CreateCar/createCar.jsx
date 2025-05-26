import { useForm } from "react-hook-form";
import { useState } from "react";
import StepIndicator from "../../components/car/StepIndicator";
import CarBrands from "../../components/car/carbrands";
import CarDetails from "../../components/car/cardatails";
import CarImages from "../../components/car/carimages";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CreateCarPage = () => {
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

  const onSubmit = (data) => {
    console.log("تم إنشاء السيارة:", data);
    // يمكنك هنا إرسال البيانات إلى الخادم
  };

  const goNext = async () => {
    let valid = false;

    if (currentStep === 1) {
      valid = await trigger("brand");
    } else if (currentStep === 2) {
      valid = await trigger([
        "name",
        "price",
        "color",
        "model",
        "year",
        "transmission",
        "fuel",
        "bodyType",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6 max-w-xl mx-auto">
      <StepIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <div className="flex justify-between items-center flex-wrap">
          <CarBrands
            value={watch("brand")}
            selectBrand={(brand) => setValue("brand", brand)}
          />
          {errors.brand && <p className="text-red-600 mt-1">الرجاء اختيار ماركة</p>}
          <input
            type="hidden"
            {...register("brand", { required: true })}
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
  );
};

export default CreateCarPage;