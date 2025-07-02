const DeleteConfirmationModal = ({ onClose , name , image}) => {
    const handleDelete = async () => {
      try {
        const res = await fetch("https://your-backend.com/api/delete-profile", {
          method: "DELETE",
          credentials: "include", // إذا كنت تستخدم كوكيز أو JWT
        });
  
        if (res.ok) {
          // نجاح الحذف، ممكن تعمل redirect مثلاً:
          window.location.href = "/goodbye";
        } else {
          alert("فشل الحذف، حاول لاحقًا");
        }
      } catch (error) {
        console.error(error);
        alert("حدث خطأ ما");
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-black text-white p-8 rounded-xl border border-gray-700 w-[90%] max-w-md">
          <div className="flex flex-col items-center">
            <img
              src={image} // ضع صورة المستخدم أو صورة افتراضية
              alt="Profile"
              className="w-20 h-20 rounded-full mb-4"
            />
            <h2 className="text-xl font-bold mb-2">Delete Your Account {name}?</h2>
            <p className="text-center text-gray-300 mb-6">
              Your profile will be lost with all your data. This action cannot be
              undone.
            </p>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white w-full py-2 rounded-full text-lg mb-3"
            >
              Delete Account
            </button>
            <button
              onClick={onClose}
              className="border border-Myprimary text-Myprimary w-full py-2 rounded-full text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmationModal;
  