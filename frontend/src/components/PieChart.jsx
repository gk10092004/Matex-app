import Chart from "chart.js/auto";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
const PieChart = ({ match, total }) => {
  const matchPer = (match * 100) / total;
  const unmatchPer = ((total - match) * 100) / total;
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["matched %", "unmatched %"],
        datasets: [
          {
            data: [`${matchPer}`, `${unmatchPer}`],
            backgroundColor: ["#90e26b", "#fff1f1"],
            hoverOffset: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [matchPer, unmatchPer]);

  return (
    <div className="w-[6rem] h-[6rem]">
      <canvas ref={chartRef} className="p-[0.1rem] " />
    </div>
  );
};

PieChart.propTypes = {
  match: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
export default PieChart;
