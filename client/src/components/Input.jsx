import React from "react";

function Input({ label, type, name, register, errors, rules = {}, ...rest }) {
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
					type={type}
					{...register(name, rules)}
					className="w-[20rem] h-[3.25rem] px-4 text-black bg-primarylight"
					{...rest}
				/>

				{errors[name]?.message && (
					<p className="text-red-500 text-sm mt-1">
						{errors[name].message}
					</p>
				)}
			</div>
		</div>
	);
}

export default Input;
