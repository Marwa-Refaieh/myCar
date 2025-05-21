import React , {useState} from 'react'
import {useParams} from 'react-router-dom'


const ComplaintDetails = () => {
  const {id} = useParams()
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // استبدل بالـ endpoint الصحيح
  //   axios
  //     .get(`https://your-api.com/api/complaints/${id}`)
  //     .then((res) => {
  //       setComplaint(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch complaint:", err);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <p className="text-white">Loading...</p>;
  // if (!complaint) return <p className="text-red-500">No complaint found.</p>;

  return (
    <div className="text-white space-y-4 bg-black my-28 p-6 w-full md:w-[40%] mx-auto rounded-xl">
      <div>
        <span className="font-semibold">Name from:</span> {/* {complaint.nameFrom}*/} 
      </div>
      <div>
        <span className="font-semibold">Problem date:</span> {/* {complaint.problemDate}*/} 
      </div>
      <div>
        <span className="font-semibold">Province:</span> {/*{complaint.province} */} 
      </div>
      <div>
        <span className="font-semibold">Complaint Type:</span> {/*{complaint.type} */} 
      </div>

      <div>
        <span className="font-semibold">Complaint:</span>
        <div className="mt-2 p-4 border border-blue-500 rounded-xl text-gray-200 bg-black">
          {/* {complaint.details} */}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
