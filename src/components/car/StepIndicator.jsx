//components/StepIndicator.jsx
import { useTranslation } from 'react-i18next';

const StepIndicator = ({ currentStep }) => {
  const getCircleStyle = (step) =>  currentStep >= step ? "bg-Myprimary" : "bg-yellow-100";
  const getLineStyle = (step) => currentStep > step ? "bg-Myprimary" : "bg-gray-200";
  const { t } = useTranslation('steps');

  return (
    <div className="flex items-center justify-center space-x-4 text-white my-6 rtl:space-x-reverse">
      {/* Step 1 */}
      <div className="flex justify-center items-center gap-8 py-10">
      
        <button
          className="flex flex-col items-center group"
        >
          <div className={`w-16 h-16 rounded-full  bg-Myprimary text-black flex items-center justify-center text-lg font-bold shadow-md transition-transform group-hover:scale-110`}>
            1
          </div>
          <h4 className={'mt-1'}>{t('brands')}</h4>
        </button>



       
      
    </div>
      {/* Line */}
      <div className={`h-1 w-10 rounded ${getLineStyle(1)}`}></div>

      {/* Step 2 */}
      <button
          className="flex flex-col items-center group"
        >
          <div className={`w-16 h-16 rounded-full  ${getCircleStyle(2)} text-black flex items-center justify-center text-lg font-bold shadow-md transition-transform group-hover:scale-110`}>
           2
          </div>
          <h4 className={'mt-1'}>{t('specification')}</h4>
        </button>
      

      {/* Line */}
      <div className={`h-1 w-10 rounded ${getLineStyle(2)}`}></div>

      {/* Step 3 */}

      <button
          className="flex flex-col items-center group"
        >
          <div className={`w-16 h-16 rounded-full  ${getCircleStyle(3)} text-black flex items-center justify-center text-lg font-bold shadow-md transition-transform group-hover:scale-110`}>
           3 
          </div>
          <h4 className={'mt-1'}>{t('photos')}</h4>
        </button>
    </div>
  );
};

export default StepIndicator;