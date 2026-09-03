import "./ServiceImageload.css";
import { useState } from "react";

function ServiceImageload({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="service-image-load">
      <div className="service-image-load-icon">
        <i className="bi bi-image"></i>
      </div>

      <div className="service-image-load-content">
        <span>Cargar imagen</span>
        <button type="button">
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default ServiceImageload;
