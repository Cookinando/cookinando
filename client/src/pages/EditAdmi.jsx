import React, { useEffect, useState } from "react";
import { updateUserProfile, getUsers } from "../services/userService.js";
import Button from "../components/Button.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditAdmi = () => {
	const [users, setUsers] = useState([]);
	const [tempUsers, setTempUsers] = useState([]);
	const navigate = useNavigate();
	const handleCancelClick = () => {
		navigate("/auth/profile");
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getUsers();
				console.log("Usuarios recibidos:", data);
				setUsers(data);
				setTempUsers(data);
			} catch (error) {
				console.error("Error al cargar los usuarios:", error);
			}
		};

		fetchUsers();
	}, []);

	const toggleAdmin = async (index) => {
		const updatedUsers = [...tempUsers];
		const user = updatedUsers[index];
		const newRole = user.role === "admin" ? "user" : "admin";

		updatedUsers[index] = { ...user, role: newRole };
		setTempUsers(updatedUsers);
	};

	const handleSaveSettings = async () => {
		const result = await Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción guardará los cambios realizados.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Sí, guardar",
			cancelButtonText: "Cancelar",
			customClass: {
				popup: "bg-dark-light text-light",
				title: "text-light font-bold text-lg",
				htmlContainer: "text-light text-sm",
				confirmButton:
					"bg-light-dark hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2",
				cancelButton:
					"bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded",
			},
			buttonsStyling: false,
		});

		if (result.isConfirmed) {
			try {
				for (let i = 0; i < tempUsers.length; i++) {
					const user = tempUsers[i];
					if (user.role !== users[i].role) {
						await updateUserProfile(user.id, { role: user.role });
						console.log(
							`Rol de ${user.username} actualizado correctamente`
						);
					}
				}

				Swal.fire({
					title: "¡Cambios realizados!",
					text: "Tus cambios han sido guardados con éxito.",
					icon: "success",
					customClass: {
						popup: "bg-dark-light text-light",
						title: "text-light font-bold text-lg",
						htmlContainer: "text-light text-sm",
						confirmButton:
							"bg-light-dark hover:bg-green-600 text-white font-semibold py-2 px-4 rounded",
					},
					buttonsStyling: false,
				});

				setUsers(tempUsers);

				navigate("/auth/profile");
			} catch (error) {
				console.error("Error al guardar los cambios:", error);
				Swal.fire({
					title: "Error",
					text: "Hubo un problema al guardar los cambios.",
					icon: "error",
					customClass: {
						popup: "bg-dark-light text-light",
						title: "text-light font-bold text-lg",
						htmlContainer: "text-light text-sm",
						confirmButton:
							"bg-light-dark hover:bg-green-600 text-white font-semibold py-2 px-4 rounded",
					},
					buttonsStyling: false,
				});
			}
		}
	};

	return (
		<div className="text-white flex flex-col items-center justify-center mb-10 sm:my-10">
			<section className="p-10 w-full max-w-4xl">
				<h1 className="text-light-dark text-3xl md:text-4xl font-bold text-center mb-10">
					Gestión de Usuarios - Administradores
				</h1>
				<div className="grid grid-cols-1 gap-10">
					<div className="py-6 px-2 sm:px-10">
						<ul className="space-y-4">
							{users.length > 0 ? (
								tempUsers.map((user, index) => (
									<li
										key={user.id}
										className="flex items-center justify-between text-lg break-words">
										<span className="text-xl max-w-1/3">
											{user.username}
										</span>
										<span className="text-md text-gray-300 w-1/2 text-center">
											{user.email}
										</span>
										<div className="flex items-center justify-center w-1/12">
											<input
												type="checkbox"
												checked={user.role === "admin"}
												className="hidden"
												onChange={() =>
													toggleAdmin(index)
												}
												id={`checkbox-${index}`}
											/>
											<label
												htmlFor={`checkbox-${index}`}
												className={`cursor-pointer w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded ${
													user.role === "admin"
														? "bg-light-dark"
														: "bg-white"
												} transition-colors duration-300`}>
												{user.role === "admin" && (
													<span className="text-black text-xl">
														✔
													</span>
												)}
											</label>
										</div>
									</li>
								))
							) : (
								<p className="text-center">
									No hay usuarios para mostrar.
								</p>
							)}
						</ul>
					</div>
				</div>
			</section>
			<div className="w-4/5 sm:w-full max-w-lg flex justify-center gap-4 sm:gap-8 mt-8">
				<Button
					type="submit"
					handleClick={handleSaveSettings}
					text="Guardar"
				/>
				<Button
					type="submit"
					handleClick={handleCancelClick}
					text="Cancelar"
				/>
			</div>
		</div>
	);
};

export default EditAdmi;
