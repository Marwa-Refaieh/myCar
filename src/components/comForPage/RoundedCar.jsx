import React from "react";
import {
  FaFlask,
  FaIndustry,
  FaCheckCircle,
  FaGlobe,
  FaPalette,
  FaLightbulb,
} from "react-icons/fa";
import { useTranslation } from 'react-i18next';


export default function FeaturesSection() {
  const { t, i18n } = useTranslation('about');

  const features = [
    {
      icon: <FaCheckCircle size={28} />,
      title: t("Our Mission"),
      text: t("textMission"),
    },
    {
      icon: <FaLightbulb size={28} />,
      title: t("Our Vision"),
      text: t("textVision"),
    },
  ];  
  return (
    <div className="bg-black py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#111] w-[90%] md:w-[30%]  border border-[#f8f8f820] hover:border-Myprimary transition p-6 rounded-3xl text-center"
          >
            <div className="text-Myprimary mx-auto w-fit  mb-4">{feature.icon}</div>
            <h3 className="text-Myprimary font-extrabold text-lg mb-3 uppercase tracking-wide">
              {feature.title}
            </h3>
            <p className="text-sm max-w-[100%] text-white font-bold leading-relaxed">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
