import React , {useState} from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import DeleteConfirmationModal from "./deleteProfileConfirm";
const ProfileCard = ({
  image,
  username,
  following,
  followers,
  rating,
  reviews,
}) => {

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };
  return (
    <div className="bg-black text-white rounded-xl p-6 w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img
        src={image}
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full border-4 border-white mb-3"
      />
      <p className="text-lg font-semibold">@{username}</p>

      <div className="flex justify-center gap-6 my-3">
        <div>
          <p className="font-bold text-lg">{following}</p>
          <p className="text-sm text-gray-400">Following</p>
        </div>
        <div>
          <p className="font-bold text-lg">{followers}</p>
          <p className="text-sm text-gray-400">Followers</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 text-yellow-400 mb-2">
        {"★".repeat(Math.floor(rating))}
        {"☆".repeat(5 - Math.floor(rating))}
        <span className="text-white ml-2">{rating.toFixed(1)}</span>
      </div>

      <p className="text-gray-400 text-sm mb-4">({reviews} Reviews)</p>

      <div className="flex justify-center gap-4">
        <Link to={'/editprofile'}>
          <Button title={'Edit Profile'}/>
        </Link>
        <button
        className='bg-red-700 inline-block text-white py-3 px-10 font-bold rounded-full hover:bg-red-800 transition uppercase '
        onClick={handleDeleteClick}
      >
        DELETE PROFILE
      </button>
              {showModal && (
        <DeleteConfirmationModal name={username} image={image} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
