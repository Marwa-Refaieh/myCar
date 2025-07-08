import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/baseUrl";
import useComplaintForm from "@/hooks/postComplint";

export default function Complaint() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ✅ جديد

  const {
    formData,
    handleInputChange,
    handleSubmit,
    submitLoading,
    submitError,
    success,
  } = useComplaintForm();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}api/my-complaints`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء تحميل البيانات."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ عند نجاح الإرسال
  useEffect(() => {
    if (success) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        setShowModal(false);
        fetchData(); // إعادة تحميل البيانات
      }, 3000);
    }
  }, [success]);


  if (loading) return <div className="w-fit  block mx-auto  h-40">
  <div className="flex gap-2">
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-Myprimary rounded-full animate-bounce"></span>
  </div>
</div>


  if(error) return <p className='block text-red-800 font-bold mx-auto w-fit'>{error}</p>
    

  return (
    <div>
      {/* عرض البوب أب عند نجاح الإرسال */}
      {showSuccessPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg z-50">
          تمت إضافة الشكوى بنجاح ✅
        </div>
      )}

{data.map((item) =>{
  return  <div key={item.id} className="text-white text-left rounded-xl p-4 shadow-lg mb-4 w-full md:w-[40%] mx-auto bg-[#232321]">
    <p className="text-sm">
       <span className="font-semibold">Title:</span> {item.title}
    </p>
    <p className="my-3">
        {item.description}
    </p>
    <p className="text-sm mt-2">
      <span className="font-semibold">Date: </span>{item.problem_date}
    </p>
    <div className="flex flex-col items-center mt-3">
      <p className="font-bold">prove :</p><br />
      <img src={item.prove} alt="prove" width="80" height="80" className="rounded-full"/>
    </div>
  </div>
})}

      <button
        onClick={() => setShowModal(true)}
        className="bg-Myprimary text-black block mx-auto py-3 px-10 font-bold rounded-full hover:bg-primaryHover transition uppercase"
      >
        Add Complaint
      </button>

      {/* مودال إضافة الشكوى */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#232321] text-white p-6 rounded-xl w-[90%] md:w-[500px] shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-white text-xl"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Add Complaint</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-black text-white border border-gray-600"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full p-2 rounded bg-black text-white border border-gray-600"
              ></textarea>
              <input
                type="file"
                name="prove"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full text-sm text-gray-300"
              />
              <div className="text-sm text-gray-400">
                Date: {formData.date}
              </div>
              {submitError && (
                <p className="text-red-500 text-center">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full py-2 bg-Myprimary text-black font-bold rounded-full hover:bg-primaryHover transition"
              >
                {submitLoading ? "Sending..." : "Submit Complaint"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}





