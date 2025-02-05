import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Portfolio Performance',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Portfolio Performance</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
