import OurServices from '@/components/Services/OurServices';
import { useTranslation } from 'react-i18next';


const Services = () => {
    const { t, i18n } = useTranslation('services');
    return (
        <div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className=" flex flex-col items-center justify-center h-full text-white text-center px-4 mb-10 mt-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase text-Myprimary ">
                        {t('Our Services')}</h1>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="uppercase">{t("home")}</span>
                        <svg
                            className={`w-4 h-4 text-Myprimary transition-transform duration-200 ${i18n.language === 'ar' ? 'rotate-180' : ''}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M7.05 4.05a1 1 0 011.414 0L13 8.586a1 1 0 010 1.414l-4.536 4.536a1 1 0 01-1.414-1.414L10.586 10 7.05 6.464a1 1 0 010-1.414z" />
                        </svg>
                        <span className="text-white uppercase">{t("Services")}</span>
                    </div>
                </div>
                <OurServices />
            </div>

        </div>
    );
}

export default Services;
