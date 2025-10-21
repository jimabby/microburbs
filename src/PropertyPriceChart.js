import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PropertyPriceChart = ({ propertyData }) => {
  const houses = propertyData.filter(p => p.property_type === "House");
  const units = propertyData.filter(p => p.property_type === "Unit");
  const labels = propertyData.map(p => p.area_name);

  const chartData = {
    labels,
    datasets: [
      {
        label: "House Price",
        data: labels.map(label => {
          const house = houses.find(h => h.area_name === label);
          return house ? house.price : 0;
        }),
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null; // initial render
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(0, 136, 254, 0.2)");
          gradient.addColorStop(1, "rgba(0, 136, 254, 0.8)");
          return gradient;
        },
        borderRadius: 8,
        barThickness: 30,
      },
      {
        label: "Unit Price",
        data: labels.map(label => {
          const unit = units.find(u => u.area_name === label);
          return unit ? unit.price : 0;
        }),
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255, 128, 66, 0.2)");
          gradient.addColorStop(1, "rgba(255, 128, 66, 0.8)");
          return gradient;
        },
        borderRadius: 8,
        barThickness: 30,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 }
        }
      },
      title: {
        display: true,
        text: "House vs Unit Prices",
        font: { size: 20 },
        padding: { top: 10, bottom: 30 }
      },
      tooltip: {
        callbacks: {
          label: context => `$${context.raw?.toLocaleString() || 0}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 30,
          font: { size: 12 }
        }
      },
      y: {
        ticks: {
          callback: value => `$${value.toLocaleString()}`,
          font: { size: 12 }
        },
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default PropertyPriceChart;
