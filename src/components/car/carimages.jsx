const CarImages = ({ register, errors, watch, setValue }) => {
  const images = watch("images");
  const video = watch("video");
  const model3D = watch("model3D");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("images", files);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setValue("video", file);
  };

  const handle3DChange = (e) => {
    const file = e.target.files[0];
    setValue("model3D", file);
  };

  return (
    <div className="space-y-6 text-white">
      {/* Photos */}
      <div>
        <label className="block font-medium mb-1">Photo</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full"
        />
        <input
          type="hidden"
          {...register("images", { required: "الصور مطلوبة" })}
        />
        {errors.images && <p className="text-red-600">{errors.images.message}</p>}
        <div className="flex gap-2 mt-2 flex-wrap">
          {Array.isArray(images) &&
            images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
        </div>
      </div>

      {/* Video */}
      <div>
        <label className="block font-medium mb-1">Add Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="block w-full"
        />
        <input type="hidden" {...register("video")} />
        {video && (
          <video src={URL.createObjectURL(video)} controls className="w-40 mt-2 rounded" />
        )}
      </div>

      {/* 3D File */}
      <div>
        <label className="block font-medium mb-1">Add 3D file</label>
        <input
          type="file"
          accept=".glb,.gltf"
          onChange={handle3DChange}
          className="block w-full"
        />
        <input type="hidden" {...register("model3D")} />
        {model3D && (
          <p className="text-sm mt-2">تم اختيار الملف: {model3D.name}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium mb-1">Price</label>
        <input
          type="number"
          {...register("price", { required: "السعر مطلوب" })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          rows={4}
          {...register("description", { required: "الوصف مطلوب" })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        ></textarea>
        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="block font-medium mb-1">Location</label>
        <input
          type="text"
          {...register("location", { required: "الموقع مطلوب" })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.location && <p className="text-red-600">{errors.location.message}</p>}
      </div>
    </div>
  );
};

export default CarImages;