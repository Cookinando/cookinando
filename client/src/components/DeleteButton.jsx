import React from "react";

const DeleteButton = ({ text, type, handleClick }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className="bg-red-400 text-black text-lg font-semibold py-3 px-4 hover:bg-light-dark/70 transition-colors duration-300 w-full"
    >
      {text}
    </button>
  );
};

export default DeleteButton;
