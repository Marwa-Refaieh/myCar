import HeroSection from '@/components/comForPage/Hero'
import React from 'react'
import AboutSection from '@/components/comForPage/AboutIntro'
import WhyChooseUs from '@/components/comForPage/WhyChoosUs'
import Feature from '@/components/comForPage/Feature'
import FeaturesSection from '@/components/comForPage/RoundedCar'
import { useTranslation } from 'react-i18next';
export default function AboutUs() { 
  const { t, i18n } = useTranslation('about'); 
  return (
    <div>
      <HeroSection title={t('ABOUT US')} page1={t('HOME')} page2={t('ABOUT')} />
      <AboutSection />
      <FeaturesSection />
      <WhyChooseUs />
      <Feature />
    </div>
  )
}  
