import React, { useState } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import Button2 from '@/components/Button2';
import {Link} from 'react-router-dom'
const EditProfile = () => {
   
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    nationalNumber: '',
    address: '',
    gender: '',
    phoneNumber: '',
    age: '',
    birthDate: '',
    email: '',
    idImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idImage') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('https://your-api-endpoint.com/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit profile.');
    }
  };

  return (
    <form
      
      className="bg-black text-white p-6 rounded-xl w-[100%] md:w-[60%] mt-28 mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Personal Profile</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Enter Your Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] placeholder-white"
      />

      <input
        type="text"
        name="userName"
        placeholder="Enter Your Name"
        value={formData.userName}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] placeholder-white"
      />

      <input
        type="text"
        name="nationalNumber"
        placeholder="National Number"
        value={formData.nationalNumber}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] placeholder-white"
      />

      <select
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] text-gray-400"
      >
        <option value="">Select Address</option>
        <option value="Riyadh">Riyadh</option>
        <option value="Jeddah">Jeddah</option>
      </select>

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] text-gray-400"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="text"
        name="phoneNumber"
        placeholder="Enter Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] placeholder-white"
      />

      <select
        name="age"
        value={formData.age}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] text-gray-400"
      >
        <option value="">Select Age</option>
        {[...Array(100)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] text-gray-400"
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] placeholder-white"
      />

      <input
        type="file"
        name="idImage"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-[#232321] text-gray-400"
      />

      <div className="flex justify-center gap-9 items-center mt-4">
  <Link to={'/setting'}>
  <Button2
          title={'Cancel'}
          onClick={()  => navigate('/setting') }
        />
         
  </Link>
    
        <Button
          type="submit"
          title={' Save'}
          onClick={handleSubmit}
        />
         
       
      </div>
    </form>
  );
};

export default EditProfile;
