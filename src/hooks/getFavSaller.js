import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";

const useFetchFavoritesSaller = () => {
  const [dataSaller, setData] = useState(null);
  const [loadingSaller, setLoading] = useState(true);
  const [errorSaller, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${baseUrl}api/favorites/get-sellers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });

        setData(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "حدث خطأ أثناء تحميل البيانات.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataSaller, loadingSaller, errorSaller };
};

export default useFetchFavoritesSaller;
