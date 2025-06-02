import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';

const useModelsByBrand = () => {
  const [myModel, setModel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const [errorModel , setErrorModel] = useState('')
  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    setLang(storedLang === 'ar' ? 'ar' : 'en');

    const selectedBrand = JSON.parse(localStorage.getItem('selectedBrand'));

    const fetchModels = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/car-features/get-model-of-brands`, {
          params: { brand_id: selectedBrand },
        });

        setModel(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
        setErrorModel("Faild To Fetch Data")
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return { myModel, loading, lang , errorModel};
};

export default useModelsByBrand;
