import React, { useState } from "react";
import axios from "axios";
import PropertyListings from "./PropertyListings"; // new import
import SuburbSummary from "./SuburbSummary";
import RiskFactors from "./RiskFactors";
import MarketSights from "./MarketSights";

const MicroburbsDashboard = () => {
  const [tab, setTab] = useState("properties");
  const [propertyData, setPropertyData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [riskData, setRiskData] = useState([]);
  const [sightData, setSightData] = useState([]);
  const [suburb, setSuburb] = useState("Belmont North");
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        `/report_generator/api/suburb/properties?suburb=${encodeURIComponent(suburb)}`,
        { headers: { Authorization: "Bearer test", "Content-Type": "application/json" } }
      );

      let parsedData =
        typeof res.data === "string"
          ? JSON.parse(res.data.replace(/\bNaN\b/g, "null"))
          : res.data;

      setPropertyData(parsedData.results || []);
      setError(parsedData.results?.length === 0 ? "No property data available." : "");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch property data.");
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        `/report_generator/api/suburb/summary?suburb=${encodeURIComponent(suburb)}`,
        { headers: { Authorization: "Bearer test", "Content-Type": "application/json" } }
      );

      let parsedData =
        typeof res.data === "string"
          ? JSON.parse(res.data)
          : res.data;

      setSummaryData(parsedData.results || []);
      setError(parsedData.results?.length === 0 ? "No summary data available." : "");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch summary data.");
    }
  };

  // Fetch Risk Factors
  const fetchRisk = async () => {
    try {
      const res = await axios.get(
        `/report_generator/api/suburb/risk?suburb=${encodeURIComponent(suburb)}`,
        { headers: { Authorization: "Bearer test", "Content-Type": "application/json" } }
      );

      let parsedData =
        typeof res.data === "string"
          ? JSON.parse(res.data.replace(/\bNaN\b/g, "null"))
          : res.data;

      setRiskData(parsedData.results || []);
      setError(parsedData.results?.length === 0 ? "No risk data available." : "");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch risk data.");
    }
  };

 const fetchSights = async () => {
  try {
    const res = await axios.get(
      `/report_generator/api/suburb/market?suburb=${encodeURIComponent(suburb)}`,
      { headers: { Authorization: "Bearer test", "Content-Type": "application/json" } }
    );

    let parsedData =
      typeof res.data === "string"
        ? JSON.parse(res.data.replace(/\bNaN\b/g, "null"))
        : res.data;

    // Flatten results if nested array
    const flatData = (parsedData.results || []).flat();

    setSightData(flatData);
    setError(flatData.length === 0 ? "No market data available." : "");
  } catch (err) {
    console.error(err);
    setError("Failed to fetch market data.");
  }
};

  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    if (newTab === "properties") fetchProperties();
    else if (newTab === "summary") fetchSummary();
    else if (newTab === "risk") fetchRisk();
    else if (newTab === "sights") fetchSights();
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif", padding: "30px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>🏡 Microburbs Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        <input
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          placeholder="Enter suburb name"
          style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #ccc", width: "300px", fontSize: "16px" }}
        />
        <button
          onClick={() => handleTabSwitch(tab)}
          style={{ padding: "12px 20px", borderRadius: "8px", border: "none", backgroundColor: "#0088FE", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        >
          Fetch Data
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", gap: "10px" }}>
        <button
          onClick={() => handleTabSwitch("summary")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: tab === "summary" ? "#0088FE" : "#ccc",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Suburb Summary
        </button>
        <button
          onClick={() => handleTabSwitch("properties")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: tab === "properties" ? "#0088FE" : "#ccc",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Properties
        </button>
        <button
          onClick={() => handleTabSwitch("risk")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: tab === "risk" ? "#0088FE" : "#ccc",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Risk Factors
        </button>
        <button
          onClick={() => handleTabSwitch("sights")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: tab === "sights" ? "#0088FE" : "#ccc",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Market Sights
        </button>
      </div>

      {error && <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>{error}</p>}

      {tab === "properties" && <PropertyListings propertyData={propertyData} />}
      {tab === "summary" && <SuburbSummary summaryData={summaryData} suburb={suburb} />}
      {tab === "risk" && <RiskFactors riskData={riskData} suburb={suburb} />}
      {tab === "sights" && <MarketSights sightData={sightData} suburb={suburb} />}
    </div>
  );
};

export default MicroburbsDashboard;
