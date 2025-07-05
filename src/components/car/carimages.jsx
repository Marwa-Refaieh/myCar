import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CarImages = ({ register, errors, watch, setValue }) => {
  const { t } = useTranslation('step3');

  const [images, setImages] = useState(Array(12).fill(null));
  const imageRefs = useRef([]);
  const model3dRef = useRef();

  const model3d = watch("model3d");

  // === Image Upload per Slot ===
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file || !(file instanceof File)) return;

    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);

    const validFiles = updatedImages.filter(Boolean);
    setValue("images", validFiles, { shouldValidate: true });
  };

  // === 3D Upload ===
  const handle3DChange = (e) => {
    const file = e.target.files[0];
    if (file instanceof File) {
      setValue("model3d", file);
    }
  };

  // === Video Link ===
  const handleVideoChange = (e) => {
    setValue("video_link", e.target.value);
  };

  return (
    <div className="space-y-6 text-white">
      {/* === Image Grid Upload === */}
      <div>
        <label className="block font-medium mb-3">{t('photo')}</label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => imageRefs.current[index]?.click()}
              className="bg-neutral-800 w-24 h-24 rounded relative cursor-pointer flex items-center justify-center hover:ring-2 hover:ring-yellow-400 transition"
            >
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span className="bg-yellow-400 text-black w-6 h-6 flex items-center justify-center rounded-full text-lg font-bold">+</span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(el) => (imageRefs.current[index] = el)}
                onChange={(e) => handleImageChange(e, index)}
              />
            </div>
          ))}
        </div>

        {/* Validation for RHF */}
        <input
          type="hidden"
          {...register("images", {
            required: t('reqphoto'),
            validate: (value) => {
              if (!value || value.length === 0) return t('reqphoto');
              if (value.length > 12) return t('max12');
              return true;
            },
          })}
        />
        {errors.images && <p className="text-red-600 mt-2">{errors.images.message}</p>}
      </div>

      {/* === 3D Upload === */}
      <div>
        <label className="block font-medium mb-3">{t('3dfile')}</label>
        <div
          onClick={() => model3dRef.current?.click()}
          className="bg-neutral-800 w-24 h-24 rounded relative cursor-pointer flex items-center justify-center hover:ring-2 hover:ring-yellow-400 transition"
        >
          <span className="bg-yellow-400 text-black w-6 h-6 flex items-center justify-center rounded-full text-lg font-bold">+</span>
        </div>
        <input
          type="file"
          accept=".glb,.gltf"
          onChange={handle3DChange}
          ref={model3dRef}
          className="hidden"
        />
        <input type="hidden" {...register("model3d")} />
        {model3d && (
          <p className="text-sm mt-2">{t('selectedfile')}: {model3d.name}</p>
        )}
      </div>

      {/* === Video Link === */}
      <div>
        <label className="block font-medium mb-1">{t('video')}</label>
        <input
          type="url"
          placeholder={t('linkvideo')}
          onChange={handleVideoChange}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        <input type="hidden" {...register("video_link")} />
      </div>

      {/* === Horsepower === */}
      <div>
        <label className="block font-medium mb-1">{t('horsepower')}</label>
        <input
          type="number"
          placeholder={t('horsepowerenter')}
          {...register("horsepower", { required: t('reqhorsepower') })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.horsepower && <p className="text-red-600">{errors.horsepower.message}</p>}
      </div>

      {/* === Odometer === */}
      <div>
        <label className="block font-medium mb-1">{t('odometer')}</label>
        <input
          type="number"
          {...register("odometer", { required: t('reqodometer') })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.odometer && <p className="text-red-600">{errors.odometer.message}</p>}
      </div>

      {/* === Engine Size === */}
      <div>
        <label className="block font-medium mb-1">{t('engine_size')}</label>
        <input
          type="number"
          step="0.1"
          {...register("engine_size", { required: t('reqengine_size') })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.engine_size && <p className="text-red-600">{errors.engine_size.message}</p>}
      </div>

      {/* === Tax and Insurance === */}
      <div>
        <label className="block font-medium mb-1">{t('tax_and_insurance')}</label>
        <select
          {...register("tax_and_insurance", { required: t('reqtax_and_insurance') })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        >
          <option value="">{t('choose')}</option>
          <option value="1">{t('yes')}</option>
          <option value="0">{t('no')}</option>
        </select>
        {errors.tax_and_insurance && (
          <p className="text-red-600">{errors.tax_and_insurance.message}</p>
        )}
      </div>

      {/* === Car Name === */}
      <div>
        <label className="block font-medium mb-1">{t('name')}</label>
        <input
          type="text"
          {...register("name", { required: t('reqname') })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>

      {/* === Price === */}
      <div>
        <label className="block font-medium mb-1">{t('price')}</label>
        <input
          type="number"
          {...register("price", { required: t('reqprice') })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
      </div>

      {/* === Description === */}
      <div>
        <label className="block font-medium mb-1">{t('desc')}</label>
        <textarea
          rows={4}
          {...register("description", { required: t('reqdesc') })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        ></textarea>
        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
      </div>
    </div>
  );
};

export default CarImages;
