import brand1 from '../../assets/home/brand1.webp'
import brand2 from '../../assets/home/brand2.webp'
import brand3 from '../../assets/home/brand3.webp'
import brand4 from '../../assets/home/brand4.webp'
import brand5 from '../../assets/home/brand5.webp'
import brand6 from '../../assets/home/brand6.webp'
import brand7 from '../../assets/home/brand7.webp'
import brand8 from '../../assets/home/brand8.webp'
import brand9 from '../../assets/home/brand9.webp'
import brand10 from '../../assets/home/brand10.webp'

const Brands = ({ setFilters, filters }) => {  

    const handleBrandClick = (brandName) => {
        setFilters((prev) => ({
            ...prev,
            brand: prev.brand === brandName ? "" : brandName, 
        }));
    };

    const brandsData = [
        { src: brand1, alt: 'Brand', name: 'Toyota' },
        { src: brand2, alt: 'Brand', name: 'Honda' },
        { src: brand3, alt: 'Brand', name: 'Ford' },
        { src: brand4, alt: 'Brand', name: 'Chevrolet' },
        { src: brand5, alt: 'Brand', name: 'BMW' },
        { src: brand6, alt: 'Brand', name: 'Audi' },
        { src: brand7, alt: 'Brand', name: 'Mercedes' },
        { src: brand8, alt: 'Brand', name: 'Nissan' },
        { src: brand9, alt: 'Brand', name: 'Hyundai' },
        { src: brand10, alt: 'Brand', name: 'Kia' },
    ];

    return (
        <div className="flex flex-wrap items-center gap-5">
            {brandsData.map((brand, index) => {
                const isActive = filters.brand === brand.name;

                return (
                    <div
                        key={index}
                        onClick={() => handleBrandClick(brand.name)}
                        className="flex flex-col items-center justify-center"
                    >
                        <div
                            className={`relative border rounded-2xl overflow-hidden cursor-pointer
                            shadow-md drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] w-20 h-20 transition
                            ${isActive ? 'border-Myprimary shadow-[0_0_15px_1px_rgba(255,235,100,0.3)] bg-[rgba(250,204,21,0.1)]' : ''}
                        `}
                        >
                            <img
                                src={brand.src}
                                alt={brand.alt}
                                className="w-full h-full object-cover bg-[#121212]"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


export default Brands;
