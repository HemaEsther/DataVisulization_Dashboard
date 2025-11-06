import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IntensityBarChart = ({ items }) => {
  // items: array of docs from backend
  // group by country and compute average intensity
  const grouped = {};
  items.forEach(it => {
    const key = it.country || 'Unknown';
    const val = typeof it.intensity === 'number' ? it.intensity : parseFloat(it.intensity) || 0;
    if (!grouped[key]) grouped[key] = { sum: 0, count: 0 };
    grouped[key].sum += val;
    grouped[key].count += 1;
  });

  const labels = Object.keys(grouped);
  const dataPoints = labels.map(k => (grouped[k].sum / grouped[k].count).toFixed(2));

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg Intensity',
        data: dataPoints,
        // let Chart.js assign colors automatically
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Average Intensity by Country' },
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default IntensityBarChart;
