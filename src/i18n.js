import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeEN from './locales/en/home.json';
import homeAR from './locales/ar/home.json';
import msgEN from './locales/en/msg.json';
import msgAR from './locales/ar/msg.json';

const resources = {
    en: {
        home: homeEN,
        msg: msgEN,
    },
    ar: {
        home: homeAR,
        msg: msgAR,
    },
    
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
