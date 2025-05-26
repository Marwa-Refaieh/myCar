import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from '@/baseUrl'; 
const CarBrands = ({ value, selectBrand }) => {
    const [activeIndex, setActiveIndex] = useState(null); 

    // fetch data

    const [myBrands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchName = async () => {
        try {
          const response = await axios.get(`${baseUrl}api/car-features/get-brands`);
          setBrands(response.data.data);
        } catch (error) {
          console.error('Error fetching name:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchName();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) return <div className="flex justify-center items-center h-40">
    <div className="flex space-x-2">
        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
    </div>
</div>

    const handelBrand = (e) =>{

      localStorage.setItem('selectedBrand' , JSON.stringify(e.id))
      selectBrand(e.name)
    }
      
 
    return (



      <div className="flex justify-between items-center flex-wrap">

        
          {myBrands.map((e , index) =>{
            return <div key={e.id} onClick={() => setActiveIndex(index)}>
              <div   className={`text-white relative border-2  mb-3 ${ activeIndex === index ? 'border-yellow-400' : 'border-gray'} flex-col  rounded-sm flex justify-center items-center p-1 cursor-pointer w-[119px] h-[100px]`} onClick={() => handelBrand(e)}>
                <img src={e.logo} alt={e}  className='max-h-14 absolute top-1 z-[-1] left-[50%] translate-x-[-50%]'/>
                 <h4 className='mt-[56px]'>{e.name}</h4>
                </div>
            </div>
          })}
      </div>
    );
  };

  
  export default CarBrands;