import React from 'react'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import Button2 from '@/components/Button2';
import { useTranslation } from 'react-i18next';
export default function Signin() {
    const { t } = useTranslation();
    return (
        <div className='absolute top-[5%] left-[50%] text-center translate-x-[-50%]  w-[80%] md:w-[40%]'>
            <img src={logo} alt="" />
            <h3 className='mb-4 text-3xl'>{t('hello')}!</h3>
            <Link to={'/signin2'}><Button title={t('signin')} /></Link>
            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">{t('or')}</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Link to={'/'}><Button2 title={t('continue')} /></Link>
        </div>
    )
}
 













