import { useTranslation } from 'react-i18next';

const StepIndicator = ({ currentStep }) => {
  const { t } = useTranslation('steps');

  const getCircleStyle = (step) => {
    if (currentStep === step) return 'bg-[#f1ea28] text-black';      // current step
    if (currentStep > step) return 'border-2 border-[#f1ea28] bg-black text-[#f1ea28'; // done
    return 'bg-gray-700 text-white'; // upcoming
  };

  const getLineStyle = (step) => {
    return currentStep > step ? 'bg-[#f1ea28]' : 'bg-black';
  };

  const steps = [
    { number: 1, label: t('brands') },
    { number: 2, label: t('specification') },
    { number: 3, label: t('photos') },
  ];

  return (
    <div className="flex items-center justify-center max-w-[90%] mx-auto space-x-6 rtl:space-x-reverse mt-14">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12  bg-[#212120] rounded-full flex items-center justify-center font-bold transition-all duration-300 ${getCircleStyle(step.number)}`}
            >
              {String(step.number).padStart(2, '0')}
            </div>
            <span className="mt-2 text-sm text-white">{step.label}</span>
          </div>

          {/* Line */}
          {index < steps.length - 1 && (
            <div className={`w-12 h-1 mt-[-22px] mx-3 rounded ${getLineStyle(step.number)}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
