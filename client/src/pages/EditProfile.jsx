import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { updateUserProfile } from "../services/userService.js";
import Swal from "sweetalert2";

const EditProfile = () => {
	const { user, setUser } = useAuth();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		defaultValues: {
			username: user?.username,
			email: user?.email,
		},
	});

	const navigate = useNavigate();
	const password = watch("password");

	const onSubmit = async (data) => {
		const result = await Swal.fire({
			title: "¿Estás seguro de que quieres actualizar tus perfil?",
			text: "Esta acción actualizara tus datos.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Sí, actualizar",
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
				await updateUserProfile(user.id, data);
				setUser({ ...user, ...data });
				Swal.fire({
					title: "¡Perfil actualizado!",
					text: `Tus datos han sido actualizados con éxito.`,
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
				navigate("/auth/profile");
			} catch (error) {
				console.error(
					"Error en la actualización del perfil:",
					error.message
				);
				Swal.fire({
					title: "Error",
					text: "Hubo un problema al actualizar tu perfil.",
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
		<div className="mb-10 sm:mx-auto sm:w-full sm:max-w-sm font-normal flex flex-col justify-center items-center text-light-dark">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
				<h2 className="mt-10 text-center text-4xl text-light-dark">
					Editar perfil
				</h2>
			</div>
			<form
				id="formlogin"
				className="space-y-6"
				onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<Input
						label="Nombre de usuario:"
						name="username"
						type="text"
						register={register}
						errors={errors}
						rules={{
							required: "El nombre de usuario es obligatorio.",
							minLength: {
								value: 3,
								message:
									"El nombre de usuario debe tener al menos 3 caracteres.",
							},
						}}
						placeholder="Ingrese su nombre de usuario"
					/>

					<Input
						label="Correo electrónico:"
						name="email"
						type="email"
						register={register}
						errors={errors}
						rules={{
							required: "El correo electrónico es obligatorio.",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message:
									"Ingrese un correo electrónico válido.",
							},
						}}
						placeholder="Ingrese su correo electrónico"
					/>

					<Input
						label="Contraseña nueva:"
						name="password"
						type="password"
						register={register}
						errors={errors}
						rules={{
							required: false,
							minLength: {
								value: 6,
								message:
									"La contraseña debe tener al menos 6 caracteres.",
							},
						}}
						placeholder="Ingrese su nueva contraseña"
					/>

					<Input
						label="Repetir nueva contraseña:"
						name="confirmPassword"
						type="password"
						register={register}
						errors={errors}
						rules={{
							validate: (value) => {
								if (password && value !== password) {
									return "Las contraseñas no coinciden.";
								}
								return true;
							},
						}}
						placeholder="Repita su nueva contraseña"
					/>
				</div>

				<div className="mt-6">
					<Button type="submit" text="Actualizar perfil" />
				</div>
			</form>
		</div>
	);
};

export default EditProfile;
