export const Privecy = ({ number, title, description }) => (
    <div className="text-white mx-auto bg-[#232321] w-full md:w-[40%] p-1 rounded-sm text-center">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );