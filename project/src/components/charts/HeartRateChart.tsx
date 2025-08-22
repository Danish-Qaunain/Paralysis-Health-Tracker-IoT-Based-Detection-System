import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HealthData } from '../../lib/supabase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HeartRateChartProps {
  data: HealthData[];
}

const HeartRateChart: React.FC<HeartRateChartProps> = ({ data }) => {
  // Format dates for x-axis
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const chartData = {
    labels: data.map(d => formatTime(d.recorded_at)),
    datasets: [
      {
        label: 'Heart Rate (BPM)',
        data: data.map(d => d.heart_rate),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const date = new Date(data[index].recorded_at);
            return date.toLocaleString();
          },
        },
      },
    },
    scales: {
      y: {
        min: 40,
        max: 140,
        ticks: {
          callback: (value) => `${value} BPM`,
        },
      },
      x: {
        reverse: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default HeartRateChart;