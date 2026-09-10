import { useState, useRef } from "react";

/**
 * Hook reutilizable para seleccion y previsualizacion de imagenes.
 * @param {object} options
 * @param {number} options.maxSizeMB - tamaño maximo permitido en MB (por defecto 2)
 * @param {Array<string>} options.allowedTypes - tipos MIME permitidos
 */

export function useImageUpload({
  maxSizeMB = 2,
  allowedTypes = ["image/jpg", "image/png", "image/webp", "image/jpeg"],
} = {}) {
  //1. Estado para guardar el archivo real (File) que se emviara al servidor
  const [file, setFile] = useState(null);

  //2. Estado para guardar el link temporal de previsualizacion
  const [preview, setPreview] = useState(null);

  //3. Estado para manejar mensaje de error
  const [error, setError] = useState(null);

  //4. Referecia al input HTML invisible
  const fileInputRef = useRef(null);

  // Funcion 1: Procesa y valida el archivo seleccionado
  const handleFileChange = (e) => {
    const selectFile = e.target.files?.[0];

    // Si el usuario abrio y el buscador de archivos pero no eligio nada y cancelo
    if (!selectFile) return;

    // Validacion 1: tipo archivo
    if (!allowedTypes.includes(selectFile.type)) {
      setError(`Formato no permitido. Usa: ${allowedTypes.join(`,`)}`);
      return;
    }

    // Validacion 2: tamaño maximo (convertimos MB a Bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectFile.size > maxSizeBytes) {
      setError(`La imagen supera el limite de ${maxSizeMB} MB.`);
      return;
    }

    //Si paso las validaciones limpio los erroes previos
    setError(null);

    // si ya habia una previsualizacion vieja, libero memoria antes de crear otro
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    // Guardo el archivo real y creo la URL temporal
    setFile(selectFile);
    setPreview(URL.createObjectURL(selectFile));
  };

  // Funcion 2: Borra la imagen seleccionada y limpia la memoria
  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);
    setError(null);

    // Limpio la referencia del input para que me permita volver a selecciona la misma imagen si quiero
    if (fileInputRef.current) {
      fileInputRef.current.value = ``;
    }
  };

  return {
    file,
    preview,
    error,
    fileInputRef,
    handleFileChange,
    removeFile,
  };
}
