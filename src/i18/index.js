
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLogin from '../locales/en/singnin.json';
import arLogin from '../locales/ar/signin.json';
import enLogin2 from '../locales/en/signin2.json'
import arLogin2 from '../locales/ar/signin2.json'
import arvercode from '../locales/ar/vercode.json'
import envercode from '../locales/en/vercode.json'
import arsettingpage from '../locales/ar/settingpage.json'
import ensettingpage from '../locales/en/settingpage.json'
import arsteps from '../locales/ar/steps.json'
import ensteps from '../locales/en/steps.json'
import arstep2 from '../locales/ar/step2.json'
import enstep2 from '../locales/en/step2.json'
import arstep3 from '../locales/ar/step3.json'
import enstep3 from '../locales/en/step3.json'
import arcreatecar from '../locales/ar/createcar.json'
import encreatecar from '../locales/en/createcar.json'
import homeEN from '../locales/en/home.json';
import homeAR from '../locales/ar/home.json';
import msgEN from '../locales/en/msg.json';
import msgAR from '../locales/ar/msg.json';
import servicesAR from '../locales/ar/services.json';
import servicesEN from '../locales/en/services.json';
import aboutAR from '../locales/ar/about.json'
import aboutEN from '../locales/en/about.json'
import blogAR from '../locales/ar/blog.json'
import blogEN from '../locales/en/blog.json'
import favAR from '../locales/ar/fav.json'
import favEN from '../locales/en/fav.json'
import editAR from '../locales/ar/edit.json'
import editEN from '../locales/en/edit.json'
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        login: enLogin,
        login2: enLogin2,
        vercode: envercode,
        settingpage: ensettingpage,
        steps: ensteps,
        step2: enstep2,
        step3: enstep3,
        createcar: encreatecar,
        home: homeEN,
        services: servicesEN,
        msg: msgEN, 
        about:aboutEN,
        blog : blogEN,
        fav : favEN,
        edit : editEN
      },
      ar: {
        login: arLogin,
        login2: arLogin2,
        varcode: arvercode,
        settingpage: arsettingpage,
        steps: arsteps,
        step2: arstep2,
        step3: arstep3,
        createcar: arcreatecar,
        home: homeAR,
        services: servicesAR,
        msg: msgAR,
        about:aboutAR,
        blog: blogAR,
        fav:favAR,
        edit : editAR
      }
    },
    lng: 'en', // اللغة الافتراضية
    fallbackLng: 'en',
    ns: ['login', 'login2', 'varcode', 'settingpage', 'steps', 'step2', 'step3', 'createcar'],
    defaultNS: 'login',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;