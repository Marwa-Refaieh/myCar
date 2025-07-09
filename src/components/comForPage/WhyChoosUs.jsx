import carImage from '../../assets/footer.png'; // replace with your image path
import { useTranslation } from 'react-i18next';

export default function WhyChooseUs() {
  const { t, i18n } = useTranslation('about');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-black text-white">
      {/* Left content */}
      <div className="p-10 flex flex-col justify-center space-y-6">
      <h4 className="relative text-white mb-2 uppercase tracking-wider pl-6">
        {t("Why Choose My Car?")}
      </h4>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight uppercase">
        {t("All-in-One Solution")} <br />
        {t("Whether you're buying, selling, or renting, everything is in one place.")}
        </h1>
      <div className='flex  gap-1'>
      {/* <Globe className='text-[#f1ea28]'/> */}
      <p className="text-gray-300  ">
        
        <b>🔍 {t("Fast & Easy Search")}</b> <br />
        {t("Use smart filters to find the right car in seconds.")}
        </p>
      </div>

      <div className='flex  gap-1'>
      {/* <Globe className='text-[#f1ea28]'/> */}
      <p className="text-gray-300  ">
        
        <b>🛡 {t("Verified Listings")} </b> <br />
        {t("We verify every ad to protect you from scams and fake offers.")}
        </p>
      </div>


      <div className='flex  gap-1'>
      {/* <Globe className='text-[#f1ea28]'/> */}
      <p className="text-gray-300  ">
        
        <b>💰 {t("Best Deals in the Market")} </b> <br />
        {t("We help you find competitive prices and great value.")}
        </p>
      </div>


      <div className='flex  gap-1'>
      {/* <Globe className='text-[#f1ea28]'/> */}
      <p className="text-gray-300  ">
        
        <b>📞 {t("Customer Support")} </b> <br />
        {t("Our team is always ready to assist you")}
        </p>
      </div>


      <div className='flex  gap-1'>
      {/* <Globe className='text-[#f1ea28]'/> */}
      <p className="text-gray-300  ">
        
        <b>👥 {t("A Trusted Community")} </b> <br />
        {t("Thousands of Syrians trust My Car to make car transactions easier and safer.")}
        </p>
      </div>

  
        






  
      </div>

      {/* Right image */}
      <div className="relative">
        <img src={carImage} alt="Car" className="w-full h-full object-cover" />
      </div>
    </div>
  ); 
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-700 h-1.5 rounded">
        <div
          className="bg-[#f1ea28] h-1.5 rounded transition-all duration-1000"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
