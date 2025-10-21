const RiskFactors = ({ suburb, riskData, loading, error }) => {
  if (loading) return <p>Loading risk factors...</p>;
  if (error) return <p>{error}</p>;
  if (!riskData || riskData.length === 0) return <p>No risk data available.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "20px auto", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Risk Factors for {suburb}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {riskData.map((risk, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)"; }}
          >
            <h3 style={{ fontSize: "1.2em", marginBottom: "10px", color: "#0070f3" }}>{risk.name}</h3>
            {risk.value ? (
              <p style={{ fontSize: "1em", color: "#555" }}>{risk.value} {risk.value_unit ? `(${risk.value_unit})` : ""}</p>
            ) : (
              <p style={{ fontSize: "1em", color: "#999" }}>No data</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskFactors;


