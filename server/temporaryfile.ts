import bcrypt from "bcrypt";
import User from "./models/userModel";

// Asegúrate de importar y configurar la conexión a tu base de datos
import db from "./database/db";

const encryptPasswords = async () => {
  try {
    // Asegúrate de que la base de datos esté autenticada y conectada
    await db.authenticate();

    const users = await User.findAll();
    for (const user of users) {
      // Solo encripta contraseñas que no estén encriptadas
      if (!user.password.startsWith("$2b$")) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
      }
    }
    console.log("Passwords encrypted successfully.");
  } catch (error) {
    console.error("Error encrypting passwords:", error);
  }
};

// Ejecuta la función de encriptación
encryptPasswords();
