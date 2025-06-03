import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";

const useFetchFavorites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${baseUrl}api/favorites/get-cars`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });

        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "حدث خطأ أثناء تحميل البيانات.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
 
export default useFetchFavorites;
