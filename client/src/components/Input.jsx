import React from "react";

function Input({ label, name, register, errors, rules = {}, ...rest }) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-xl leading-6">
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          id={name}
          type="text"
          {...register(name, rules)}
          className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight"
          {...rest}
        />
        {errors[name]?.type === "required" && (
          <p className="text-red-500 text-sm mt-1">
            Es necesario ingresar su {label.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;