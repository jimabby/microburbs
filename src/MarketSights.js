import React from "react";

const MarketSights = ({ sightData, loading, error }) => {
  if (loading) return <p>Loading market sights...</p>;
  if (error) return <p>{error}</p>;
  if (!sightData || sightData.length === 0) return <p>No market sights data available.</p>;

  return (
    <div className="market-container" style={{ padding: "20px" }}>
      <h2>Market Sights for Belmont North</h2>
      <div className="market-cards" style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {sightData.map((item, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              flex: "1 1 250px",
            }}
          >
            <h3>{item.area_name}</h3>
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Property Type:</strong> {item.property_type}</p>
            <p><strong>Value:</strong> ${item.value?.toLocaleString()}</p>
            {item.sa3 && (
              <p><strong>SA3 Area ({item.sa3.area_name}):</strong> ${item.sa3.value?.toLocaleString()}</p>
            )}
            {item.cr && (
              <p><strong>CR Area ({item.cr.area_name}):</strong> ${item.cr.value?.toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSights;
