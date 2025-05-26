import React from 'react';
import Hero from '../../components/Hero';
import Services from '../../components/home/Services';
import Brands from '../../components/home/Brands';
import TopFeatured from '../../components/home/TopFeatured';
import HeroImage from '../../components/home/HeroImage';
import Choose from '../../components/home/Choose';
import Blog from '../../components/home/Blog';
import Popular from '@/components/home/Popular';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Home = () => {
    const {t} = useTranslation('home');
    return (
        <div>
            <Hero />
            <div className='max-w-7xl mx-auto px-4'>
                <Services />
            </div>

            <div className='pt-20 max-w-7xl mx-auto px-4'>
                <h2 className="text-5xl font-bold text-center mb-10 text-Myprimary ">{t('Brands')}</h2>
                <Brands />
                <Link to={"/brands"} className='flex justify-center mt-10'>
                    <Button title={t("SEE ALL BRANDS")} />
                </Link>
            </div>
            <div className='pt-20 max-w-7xl mx-auto px-4'>
                <Popular />
                <Link to={'/popular'} className='flex justify-center mt-10'>
                    <Button title={t("See All Popular Categories")} />
                </Link>
            </div>
            <div className='pt-20 max-w-7xl mx-auto px-4'>
                <Choose />
            </div>
            <div className='pt-20 max-w-7xl mx-auto px-4'>
                <TopFeatured />
            </div>
            <HeroImage />

            <div className='pt-20 max-w-7xl mx-auto px-4'>
                <Blog />
            </div>

        </div>
    );
}


export default Home;
