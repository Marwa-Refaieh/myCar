import BlogGrid from '@/components/comForPage/Blog'
import HeroSection from '@/components/comForPage/Hero'
import React from 'react'
import { useTranslation } from 'react-i18next';


export default function Blog() { 
  const { t, i18n } = useTranslation('blog');

  return (
    <div>
        <HeroSection title={t("BLOGS")} page1={t('PAGE1')} page2={t('PAGE2')}/>
        <BlogGrid/>
    </div>
  )
}
 