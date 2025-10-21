import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropertyPriceChart from "./PropertyPriceChart";

// Fix default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Map component that auto-fits all property markers
const MapWithBounds = ({ propertyData }) => {
  const bounds = propertyData.map(p => [p.coordinates.latitude, p.coordinates.longitude]);

  const FitBounds = () => {
    const map = useMap();
    if (bounds.length) map.fitBounds(bounds, { padding: [50, 50] });
    return null;
  };

  return (
    <MapContainer
      style={{ height: "400px", width: "100%", marginTop: "20px", borderRadius: "12px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {propertyData.map((p, idx) => (
        <Marker key={idx} position={[p.coordinates.latitude, p.coordinates.longitude]}>
          <Popup>
            <strong>{p.area_name}</strong>
            <br />
            ${p.price?.toLocaleString() || "N/A"}
          </Popup>
        </Marker>
      ))}
      <FitBounds />
    </MapContainer>
  );
};

const PropertyListings = ({ propertyData }) => {
  if (!propertyData || propertyData.length === 0) {
    return <p>No property data available.</p>;
  }

  return (
    <div>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Property Listings</h2>

      {/* Chart */}
      <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
        <PropertyPriceChart propertyData={propertyData} />
      </div>

      {/* Property List */}
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}>
        {propertyData.map((item, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ marginBottom: "5px" }}>{item.area_name}</h3>
            <p><strong>Price:</strong> ${item.price?.toLocaleString()}</p>
            <p><strong>Type:</strong> {item.property_type}</p>
            <p><strong>Bedrooms:</strong> {item.attributes.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {item.attributes.bathrooms}</p>
            <p><strong>Garage:</strong> {item.attributes.garage_spaces}</p>
            <p><strong>Land Size:</strong> {item.attributes.land_size}</p>
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
              {item.attributes.description.length > 150
                ? item.attributes.description.slice(0, 150) + "..."
                : item.attributes.description}
            </p>
          </div>
        ))}
      </div>

      {/* Map */}
      <MapWithBounds propertyData={propertyData} />
    </div>
  );
};

export default PropertyListings;

