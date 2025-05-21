const Button = ({ title, style = "px-3 py-2", active = false }) => {
    const activeClass = "border-Myprimary shadow-[0_0_15px_1px_rgba(255,235,100,0.3)] bg-[rgba(250,204,21,0.1)]";

    return (
        <button
            className={`${style} bg-MyOption border-2 rounded-lg border-Mycard transition-all cursor-pointer duration-300 ease-in-out
        hover:border-Myprimary hover:bg-[rgba(250,204,21,0.1)]
        ${active ? activeClass : ""}`}
        >
            {title}
        </button>
    );
};

export default Button;
