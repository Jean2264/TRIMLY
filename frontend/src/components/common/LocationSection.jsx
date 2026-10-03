import "./LocationSection.css";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function LocationSection() {
  const mapContainer = useRef(null);

  const businessName = "Barbería 48";
  const address = "Calle 811 550, Alejandro Korn, Provincia de Buenos Aires";

  const businessInitial = businessName.charAt(0).toUpperCase();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  useEffect(() => {
    let map;

    const loadMap = async () => {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?` +
          `q=${encodeURIComponent(address)}` +
          `&country=AR` +
          `&language=es` +
          `&limit=1` +
          `&autocomplete=false` +
          `&access_token=${mapboxgl.accessToken}`,
      );

      const data = await response.json();

      console.log("Resultado geocoding:", data);

      if (!data.features.length) {
        console.error("No se encontró la dirección.");
        return;
      }

      const coordinates = data.features[0].geometry.coordinates;

      console.log("Coordenadas:", coordinates);

      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: coordinates,
        zoom: 16,
      });

      map.on("load", () => {
        map.resize();
      });

      // Pin personalizado
      const markerElement = document.createElement("div");

      markerElement.className = "trimly-marker";

      markerElement.innerHTML = `
        <div class="trimly-marker-inner">
          ${businessInitial}
        </div>
      `;

      new mapboxgl.Marker(markerElement).setLngLat(coordinates).addTo(map);
    };

    loadMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <section className="location-section">
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="location-map-link"
      >
        <div ref={mapContainer} className="location-map"></div>
      </a>

      <p className="location-address">{address}</p>
    </section>
  );
}

export default LocationSection;
