export default function SettingItem({ title, icon, onClick }) {
    return (
      <div
        onClick={onClick}
        className="flex justify-between items-center py-4 px-2 hover:bg-gray-800 rounded-xl transition cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
            {icon}
          </div>
          <span className="text-md font-medium">{title}</span>
        </div>
        <span className="text-xl">{'‹'}</span>
      </div>
    );
  }
  