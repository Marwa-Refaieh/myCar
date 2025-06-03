import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import ConfirmDeleteUser from '../../components/favorite/confirmDeleteUser';

export default function UserCard({ name , image   ,    following,
    followers,
    
    reviews}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* User card */}
      <div className="relative w-48 flex flex-col mb-5 items-center bg-black p-4 rounded-2xl text-white">
        {/* Profile image */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-28 h-28 object-cover rounded-full border-2 border-white"
          />
          {/* Heart icon */}
          <div className="absolute top-0 right-0 bg-[#333] p-1 rounded-full">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
        </div>

        {/* Username */}
        <p className="mt-3 text-lg font-medium">{name}</p>

        {/* Delete button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-full transition"
        >
          Delete
        </button>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <ConfirmDeleteUser
        image={image}
        name = {name}
        following={following}
        followers={followers}
        reviews={reviews}
          onConfirm={() => {
            console.log("User deleted");
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
