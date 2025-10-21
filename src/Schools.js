import React from "react";

const Schools = ({ schoolData, loading, error }) => {
  if (loading) return <p>Loading school data...</p>;
  if (error) return <p>{error}</p>;
  if (!schoolData || schoolData.length === 0) return <p>No school data available.</p>;

  return (
    <div className="schools-container" style={{ padding: "20px" }}>
      <h2>Schools in Belmont North</h2>
      <div className="school-cards" style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {schoolData.map((school, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              flex: "1 1 300px",
            }}
          >
            <h3>{school.name}</h3>
            <p><strong>Type:</strong> {school.school_level_type} ({school.school_sector_type})</p>
            <p><strong>Attendance Rate:</strong> {(school.attendance_rate * 100).toFixed(1)}%</p>
            <p><strong>Students:</strong> {school.boys + school.girls} ({school.boys} boys, {school.girls} girls)</p>
            <p><strong>NAPLAN:</strong> {school.naplan_rank}</p>
            <p><strong>Socioeconomic Rank:</strong> {school.socioeconomic_rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schools;
