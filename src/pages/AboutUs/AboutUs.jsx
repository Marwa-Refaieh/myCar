import HeroSection from '@/components/comForPage/Hero'
import React from 'react'
import img from '../../assets/hero3.png'
import logo from '../../assets/Vector.png'
import logo1 from '../../assets/distance.png'
import logo2 from '../../assets/color.png'
import FeatureCard from '@/components/comForPage/AboutCard'
import AboutSection from '@/components/comForPage/AboutIntro'
import WhyChooseUs from '@/components/comForPage/WhyChoosUs'
import AchievementsSection from '@/components/comForPage/AchiveSection'
export default function AboutUs() {
  return (
    <div>
        <HeroSection title={'ABOUT US'} page1={'HOME'} page2={'ABOUT'} img={img}/>
        <AboutSection/>
        <section className="bg-[#111] px-6 md:px-20 pb-20 flex flex-col md:flex-row gap-4">
      <FeatureCard
        img={logo}
        title="Cylinder Configuration"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus."
      />
      <FeatureCard
        img={logo1}
        title="Fuel Efficiency"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus."
      />
      <FeatureCard
        img={logo2}
        title="Max Revolutions"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus."
        isActive
      />
    </section>
    <WhyChooseUs/>
   <AchievementsSection/>
    </div>
  )
}  
