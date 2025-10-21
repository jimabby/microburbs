const SuburbSummary = ({ summaryData, suburb }) => {
  if (!summaryData || summaryData.length === 0) return <p>No summary data available.</p>;

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Suburb Summary for {suburb}</h2>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {summaryData.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ marginBottom: "10px", color: "#0088FE" }}>{item.name}</h4>
            <p><strong>Score:</strong> {item.value}</p>
            <p>{item.summary[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuburbSummary;
