const colors = ["#000000", "#FF8C00", "#FF69B4", "#DC143C", "#8A2BE2", "#DDA0DD" , "#fff" , "#35b7ee" ,"#fff700" , "#5f5f5f"];
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import useModelsByBrand from "@/hooks/useModelsByBrand";
import getCity from "@/hooks/getCity";

const CarDetails = ({ register, errors }) => {
  const [selectedColor, setSelectedColor] = useState(localStorage.getItem('color')|| "#000000" ); // اللون الافتراضي

 
  const { t } = useTranslation('step2'); 

  const { myModel, loading, lang , errorModel} = useModelsByBrand();
  const { myCity , myloading , errorCity} = getCity()
     

  if (loading) return <div className="flex justify-center items-center h-40">
    <div className="flex space-x-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
    </div>
  </div>

if (myloading) return <div className="flex justify-center items-center h-40">
<div className="flex space-x-2">
  <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
  <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
  <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
</div>
</div>


 if(errorCity || errorModel) return <p className='block text-red-800 font-bold mx-auto w-fit'>Faild To Fetch Data</p>



  return (
    <div className="space-y-4 text-white">
            {/* === Car Name === */}
            <div>
        <label className="block font-medium mb-1">{t('name')}</label>
        <input
          type="text"
          {...register("name", { required: t('reqnmae') })}
          className="w-full p-2 rounded-full bg-neutral-800 text-white"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      {/* tax */}
      <div>
        <label className="block font-medium mb-1">{t('tax_and_insurance')}</label>
        <select
          {...register("tax_and_insurance", { required: t('reqtax_and_insurance') })}
          className="w-full p-2 rounded-full bg-neutral-800 text-white"
        >
          <option value="" hidden>{t('select')}</option> 
          <option value="1">{t('yes')}</option>
          <option value="0">{t('no')}</option>
        </select>
        {errors.tax_and_insurance && (
          <p className="text-red-600">{errors.tax_and_insurance.message}</p>
        )}
      </div>
      {/* Model */}
      <div>
        <label className="block font-medium">{t('model')}</label>
        <select {...register("model_id", { required: t('reqmodel') })} className="w-full p-2 rounded-full bg-neutral-800">
          <option value="" hidden>{t('select')}</option>
          {myModel.map((item) => {
            return <option value={item.id} key={item.id}>{item.name[lang]}</option>
          })}
        </select>
        {errors.model_id && <p className="text-red-600">{errors.model_id.message}</p>}
      </div>

            {/* Year */}
            <div>
        <label className="block font-medium">{t('year')}</label>
        <select {...register("year_production", { required: t('reqyear') })} className="w-full p-2 rounded-full bg-neutral-800">
          <option value="" hidden>{t('select')}</option>
          <option value="1990">1990</option>
          <option value="1991">1991</option>          <option value="1992">1992</option>
          <option value="1993">1993</option>          <option value="1994">1994</option>
          <option value="1995">1995</option>          <option value="1996">1996</option>
          <option value="1997">1997</option>          <option value="1998">1998</option>
          <option value="1999">1999</option>          <option value="2000">2000</option>
          <option value="2001">2001</option>          <option value="2002">2002</option>
          <option value="2003">2003</option>          <option value="2004">2004</option>
          <option value="2005">2005</option>          <option value="2006">2006</option>
          <option value="2007">2007</option>          <option value="2008">2008</option>
          <option value="2009">2009</option>          <option value="2010">2010</option>
          <option value="2011">2011</option>          <option value="2012">2012</option>
          <option value="2013">2013</option>          <option value="2014">2014</option>
          <option value="2015">2015</option>          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        {errors.year_production && <p className="text-red-600">{errors.year_production.message}</p>}
      </div>

      {/* Mails */}
      <div>
        <label className="block font-medium mb-1">{t('odometer')}</label>
        <input
          type="number"
          {...register("odometer", { required: t('reqodometer') })}
          className="w-full p-2 rounded-full bg-neutral-800 text-white"
        />
        {errors.odometer && <p className="text-red-600">{errors.odometer.message}</p>}
      </div>

            {/* Transmission */}
            <div>
        <label className="block font-medium">{t('transmission')}</label>
        <select {...register("transmission_type", { required: t('reqtransmission') })} className="w-full p-2 rounded-full bg-neutral-800">
          <option value="" hidden>{t('select')}</option>
          <option value="1">Automatic</option>
          <option value="3">Manual</option>
          <option value="2">Electric</option>
        </select>
        {errors.transmission_type && <p className="text-red-600">{errors.transmission_type.message}</p>}
      </div>

      {/* Fuel / Electric */}
      <div>
        <label className="block font-medium">{t('fuel')}</label>
        <select {...register("fuel_type", { required: t('reqfuel') })} className="w-full p-2 rounded-full bg-neutral-800">
          <option value="" hidden>{t('select')}</option>
          <option value="1">Petrol</option>
          <option value="2">Diesel</option>
          <option value="3">Electric</option>
        </select>
        {errors.fuel_type && <p className="text-red-600">{errors.fuel_type.message}</p>}
      </div>



      {/* cite */}
      <div>
        <label className="block font-medium">{t('city')}</label>
        <select {...register("city_id", { required: t('reqcity') })} className="w-full p-2 rounded-full bg-neutral-800">
          <option value="" hidden>{t('select')}</option>
          {myCity.map((item) => {
            return <option value={item.id} key={item.id}>{item.name}</option>
          })}
        </select>
        {errors.city_id && <p className="text-red-600">{errors.city_id.message}</p>}
      </div>






      {/* Body Type */}
      <div>
        <label className="block font-medium">{t('bodytype')}</label>
        <select {...register("body_type", { required: t('reqbodytype') })} className="w-full p-2 rounded-full bg-neutral-800">
          <option value="" hidden>{t('select')}</option>
          <option value="4">SUV</option>
          <option value="1">Compact</option>
          <option value="2">SportCoupe</option>
        </select>
        {errors.body_type && <p className="text-red-600">{errors.body_type.message}</p>}
      </div>

      {/* Color */}
      <div>
        <label className="block font-medium mb-1">{t('color')}</label>

        <div>


          <div className="flex gap-4 mb-2">
                      {/* Preview box */}
          
            
                      <div
              className="w-16 h-16 rounded-sm border border-white"
              style={{ backgroundColor: selectedColor }}
            ></div>
        
             <div className="max-w-[70%] md:max-w-[40%] flex flex-wrap gap-2">
             {colors.map((color, index) => (
              <label key={index} className="relative cursor-pointer">
                <input
                  type="radio"
                  value={color}
                  {...register("color", { required: t('reqcolor') })}
                  onClick={(e) => {
                    localStorage.setItem('color' , e.target.value)
                    setSelectedColor(e.target.value)
                  }}
                  className="peer hidden"
                />
                <div
                  className={`w-6 h-6 rounded-sm border-2 ${selectedColor === color ? "border-white ring-2 ring-white" : "border-gray-400"
                    }`}
                  style={{ backgroundColor: color }}
                ></div>
              </label>
            ))}
             </div>
          </div>



          {errors.color && <p className="text-red-600">{errors.color.message}</p>}
        </div>
        {/* Doors */}
        <div>
          <label className="block font-medium">{t('doors')}</label>
          <select {...register("doors", { required: t('reqdoors') })} className="w-full p-2 rounded-full bg-neutral-800">
            <option value="" hidden>{t('select')}</option>
            <option value="2">2</option>
            <option value="4">4</option>
          </select>
          {errors.doors && <p className="text-red-600">{errors.doors.message}</p>}
        </div>
        {/* Seats */}
        <div>
          <label className="block font-medium">{t('seats')}</label>
          <input
            required
            type="number"
            {...register("seats", { required: t('reqseats') })}
            className="w-full p-2 rounded-full bg-neutral-800 text-white"
          />
          {errors.seats && <p className="text-red-600">{errors.seats.message}</p>}
        </div>
 

{/* horsepower */}
        <div>
        <label className="block font-medium mb-1">{t('horsepower')}</label>
        <input
          type="number"
          {...register("horsepower", { required: t('reqhorsepower') })}
          className="w-full p-2 rounded-full bg-neutral-800 text-white"
        />
        {errors.horsepower && <p className="text-red-600">{errors.horsepower.message}</p>}
      </div>

{/* engine_cylinder */}
      <div>
        <label className="block font-medium mb-1">{t('engine_cylinder')}</label>
        <input
          type="number"
          {...register("engine_cylinder", { required: t('reqengine_cylinder') })}
          className="w-full p-2 rounded-full bg-neutral-800 text-white"
        />
        {errors.horsepower && <p className="text-red-600">{errors.engine_cylinder.message}</p>}
      </div>

{/* engine_size */}
      <div>
        <label className="block font-medium mb-1">{t('engine_size')}</label>
        <input
          type="number"
          step="0.1"
          {...register("engine_size", { required: t('reqengine_size') })}
          className="w-full p-2 rounded-full bg-neutral-800 text-white"
        />
        {errors.engine_size && <p className="text-red-600">{errors.engine_size.message}</p>}
      </div>
      </div>
    </div>
  );
};

export default CarDetails;









