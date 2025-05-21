const colors = ["#000000", "#FF8C00", "#FF69B4", "#DC143C", "#8A2BE2", "#DDA0DD"];
import { useState } from "react";

const CarDetails = ({ register, errors }) => {
  const [selectedColor, setSelectedColor] = useState("#000000"); // اللون الافتراضي

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  }
  return (
    <div className="space-y-4 text-white">
      {/* Model */}
      <div>
        <label className="block font-medium">Model</label>
        <select {...register("model", { required: "الموديل مطلوب" })} className="w-full p-2 rounded bg-neutral-800">
          <option value="">Select</option>
          <option value="Model A">Model A</option>
          <option value="Model B">Model B</option>
        </select>
        {errors.model && <p className="text-red-600">{errors.model.message}</p>}
      </div>

      {/* Year */}
      <div>
        <label className="block font-medium">Year</label>
        <select {...register("year", { required: "السنة مطلوبة" })} className="w-full p-2 rounded bg-neutral-800">
          <option value="">Select</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        {errors.year && <p className="text-red-600">{errors.year.message}</p>}
      </div>

      {/* Transmission */}
      <div>
        <label className="block font-medium">Transmission</label>
        <select {...register("transmission", { required: "ناقل الحركة مطلوب" })} className="w-full p-2 rounded bg-neutral-800">
          <option value="">Select</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        {errors.transmission && <p className="text-red-600">{errors.transmission.message}</p>}
      </div>

      {/* Fuel / Electric */}
      <div>
        <label className="block font-medium">Fuel / electric</label>
        <select {...register("fuel", { required: "نوع الوقود مطلوب" })} className="w-full p-2 rounded bg-neutral-800">
          <option value="">Select</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
        {errors.fuel && <p className="text-red-600">{errors.fuel.message}</p>}
      </div>

      {/* Body Type */}
      <div>
        <label className="block font-medium">Body Type</label>
        <select {...register("bodyType", { required: "نوع الهيكل مطلوب" })} className="w-full p-2 rounded bg-neutral-800">
          <option value="">Select</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
        </select>
        {errors.bodyType && <p className="text-red-600">{errors.bodyType.message}</p>}
      </div>

      {/* Color */}
      <div>
        <label className="block font-medium mb-1">Color</label>

        <div>
        

        <div className="flex flex-wrap gap-2 mb-2">
          {colors.map((color, index) => (
            <label key={index} className="relative cursor-pointer">
              <input
                type="radio"
                value={color}
                {...register("color", { required: "اللون مطلوب" })}
                defaultChecked={color === "#000000"}
                onChange={handleColorChange}
                className="peer hidden"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? "border-white ring-2 ring-white" : "border-gray-400"
                }`}
                style={{ backgroundColor: color }}
              ></div>
            </label>
          ))}
        </div>

        {/* Preview box */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm">Preview:</span>
          <div
            className="w-8 h-8 rounded border border-white"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </div>

        {errors.color && <p className="text-red-600">{errors.color.message}</p>}
      </div>
      {/* Doors */}
      <div>
        <label className="block font-medium">Doors</label>
        <select {...register("doors", { required: "عدد الأبواب مطلوب" })} className="w-full p-2 rounded bg-neutral-800">
          <option value="">Select</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
        {errors.doors && <p className="text-red-600">{errors.doors.message}</p>}
      </div>
      {/* Seats */}
      <div>
        <label className="block font-medium">Seats</label>
        <input
        required
          type="number"
          {...register("seats", { required: "عدد المقاعد مطلوب" })}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        />
        {errors.seats && <p className="text-red-600">{errors.seats.message}</p>}
      </div>
    </div>
    </div>
  );
};

export default CarDetails;









