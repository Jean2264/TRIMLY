import { useState } from "react";
import { useImageUpload } from "../../hooks/useImageUpload";

export function useActivarCuenta() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

  // Instanciamos nuestro hook reutilizable de imágenes
  const imageUpload = useImageUpload({ maxSizeMB: 2 });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validamos coincidencia de contraseñas
    if (password !== confirmPassword) {
      setFormError("Las contraseñas no coinciden.");
      return;
    }

    setFormError(null);

    // Acá tenés todo listo para enviar al backend:
    // imageUpload.file -> El objeto File de la imagen (o null)
    // password -> La contraseña validada
    console.log("Formulario enviado:", {
      password,
      avatarFile: imageUpload.file,
    });
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    formError,
    imageUpload, // Exportamos todo el kit del avatar (file, preview, handleFileChange, removeFile, fileInputRef, error)
    handleSubmit,
  };
}
