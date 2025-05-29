import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';

const getCity = () => {
  const [myCity, setCity] = useState([]);
  const [myloading, setLoading] = useState(true);

  useEffect(() => {


    const fetchCity = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/car-features/get-cities`);

        setCity(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, []);

  return { myCity, myloading };
};

export default getCity;
