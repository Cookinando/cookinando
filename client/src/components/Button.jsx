import React from "react";

const Button = ({ text, type, handleClick }) => {
	return (
		<button
			type={type}
			onClick={handleClick}
			className="bg-light-dark text-black text-lg font-semibold py-3 px-4 hover:bg-light-dark/70 transition-colors duration-300 w-full">
			{text}
		</button>
	);
};

export default Button;
