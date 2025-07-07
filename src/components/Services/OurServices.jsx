import Title from './Title';
import OurServicesCard from './OurServicesCard';

const OurServices = () => {
    const data = [
        {
            number: "01",
            title: "Buy a Car",
            question: "Looking for your next ride?",
            text: "Browse hundreds of verified listings across Syria. Use filters by brand, model, year, price, and location to find the perfect car for your needs and budget.",
        },

        {
            number: "02",
            title: "Rent a Car",
            question: "Need a car for a few days or weeks?",
            text: "Find rental options for daily, weekly, or monthly use. Perfect for business trips, family vacations, or short-term needs.",
        },

        {
            number: "03",
            title: "Sell Your Car",
            question: "Want to sell your car fast and at the right price?",
            text: "List your vehicle in just a few clicks with clear photos and details. Reach thousands of buyers directly through our trusted platform.",
        },

        {
            number: "04",
            title: "Car Dealers & Showrooms",
            question: "Are you a dealership or car showroom?",
            text: "Join My Car as a verified partner and showcase your inventory to thousands of users daily.",
        },

        {
            number: "05",
            title: "Car Search & Alerts",
            question: "Don’t want to keep checking every day?",
            text: "Set up alerts based on your favorite car specs and get notified the moment a match is posted.",
        },

        {
            number: "06",
            title: "Documentation & Assistance ",
            soon: "(Coming Soon)",
            question: "",
            text: "We’re working on adding services to help with car-related paperwork like sale agreements, ownership transfer, and more—so you don’t have to worry about the legal side.",
        },

    ]
    return (
        <div>
            <div className="flex flex-col items-center">

                <Title
                    small="Our Services"
                    text1="Everything You Need – Buy, Sell,"
                    text2="or Rent with Confidence"
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
