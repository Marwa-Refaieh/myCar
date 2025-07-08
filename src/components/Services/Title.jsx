import { useTranslation } from "react-i18next";

const Title = ({ small, text1, text2 }) => {
    const { i18n } = useTranslation();
    return (
        <div className='text-center'>
            <small
                className={`relative text-sm text-white uppercase tracking-wider pl-3 before:content-[''] before:absolute ${i18n.language === 'ar' ? 'before:right-0 pl-0 pr-3' : 'before:left-0 pl-3'
                    } before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-4 before:bg-Myprimary`}
            >
                {small}
            </small>

            <div className='uppercase text-2xl md:text-[2.5rem] font-medium md:leading-[3.3rem] mt-3'>
                <p className="md:block hidden">{text1}</p>
                <p className="md:block hidden">{text2}</p>
                <p className="md:hidden block">{text1} {text2}</p>
            </div>
        </div>
    );
}

export default Title;
