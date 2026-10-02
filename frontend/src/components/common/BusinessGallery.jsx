import { useEffect, useState } from "react";
import "./BusinessGallery.css";

import i1 from "../../assets/img/i1.jpg";
import i2 from "../../assets/img/i2.jpg";
import i3 from "../../assets/img/i3.jpg";

function BusinessGallery() {
  const images = [i1, i2, i3];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="business-gallery">
      <div
        className="business-gallery-track"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Imagen del negocio ${index + 1}`}
          />
        ))}
      </div>

      <span className="business-gallery-counter">
        {currentImage + 1}/{images.length}
      </span>
    </section>
  );
}

export default BusinessGallery;
