import Title from './Title';
import OurServicesCard from './OurServicesCard';
import { useTranslation } from 'react-i18next';

const OurServices = () => {
    const { t } = useTranslation('services');

    const data = [
        {
            number: "01",
            title: t("Buy a Car"),
            question: t("Looking for your next ride?"),
            text: t("Browse hundreds of verified listings across Syria. Use filters by brand, model, year, price, and location to find the perfect car for your needs and budget."),
        },
        {
            number: "02",
            title: t("Rent a Car"),
            question: t("Need a car for a few days or weeks?"),
            text: t("Find rental options for daily, weekly, or monthly use. Perfect for business trips, family vacations, or short-term needs."),
        },
        {
            number: "03",
            title: t("Sell Your Car"),
            question: t("Want to sell your car fast and at the right price?"),
            text: t("List your vehicle in just a few clicks with clear photos and details. Reach thousands of buyers directly through our trusted platform."),
        },
        {
            number: "04",
            title: t("Car Dealers & Showrooms"),
            question: t("Are you a dealership or car showroom?"),
            text: t("Join My Car as a verified partner and showcase your inventory to thousands of users daily."),
        },
        {
            number: "05",
            title: t("Car Search & Alerts"),
            question: t("Don’t want to keep checking every day?"),
            text: t("Set up alerts based on your favorite car specs and get notified the moment a match is posted."),
        },
        {
            number: "06",
            title: t("Documentation & Assistance"),
            soon: t("(Coming Soon)"),
            question: "",
            text: t("We’re working on adding services to help with car-related paperwork like sale agreements, ownership transfer, and more—so you don’t have to worry about the legal side."),
        },
    ];

    return (
        <div>
            <div className="flex flex-col items-center">
                <Title
                    small={t("Our Services")}
                    text1={t("Everything You Need – Buy, Sell,")}
                    text2={t("or Rent with Confidence")}
                />

                <div className="flex flex-wrap justify-center gap-6 mt-10 w-full ">
                    {data.map((item, index) => (
                        <OurServicesCard
                            key={index}
                            number={item.number}
                            title={item.title}
                            question={item.question}
                            text={item.text}
                            soon={item.soon || ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurServices;
