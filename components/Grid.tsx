import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import { Dialog, DialogContent, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaDollarSign, FaChartBar, FaUsers, FaArrowUp } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const sampleData = [
  { company: "Company A", recordKeeper: "Ameritas", numParticipants: 78, autoEnrollment: "Yes", vesting: "Yes", profitSharing: "Yes", marketingPermission: "Monthly" },
  { company: "Company B", recordKeeper: "Fidelity", numParticipants: 24, autoEnrollment: "Yes", vesting: "No", profitSharing: "Yes", marketingPermission: "Weekly" },
  { company: "Company C", recordKeeper: "Vanguard", numParticipants: 3, autoEnrollment: "No", vesting: "Yes", profitSharing: "No", marketingPermission: "Monthly" },
  { company: "Company D", recordKeeper: "John Hancock", numParticipants: 14, autoEnrollment: "No", vesting: "No", profitSharing: "Yes", marketingPermission: "Weekly" },
  { company: "Company E", recordKeeper: "Ameritas", numParticipants: 23, autoEnrollment: "No", vesting: "Yes", profitSharing: "No", marketingPermission: "Unlimited" },
  { company: "Company F", recordKeeper: "Fidelity", numParticipants: 18, autoEnrollment: "Yes", vesting: "Yes", profitSharing: "Yes", marketingPermission: "N/A" },
  { company: "Company G", recordKeeper: "Vanguard", numParticipants: 4, autoEnrollment: "No", vesting: "No", profitSharing: "No", marketingPermission: "Monthly" },
  { company: "Company H", recordKeeper: "John Hancock", numParticipants: 6, autoEnrollment: "Yes", vesting: "No", profitSharing: "Yes", marketingPermission: "Weekly" },
];

const Grid: React.FC = () => {
  const [rowData] = useState(sampleData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<typeof sampleData[0] | null>(null);

  const chartData = useMemo(() => ({
    labels: sampleData.map(item => item.company),
    datasets: [
      {
        label: 'Number of Participants',
        data: sampleData.map(item => item.numParticipants),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(75, 0, 130, 0.8)');
          gradient.addColorStop(1, 'rgba(138, 43, 226, 0.8)');
          return gradient;
        },
        borderColor: 'rgba(75, 0, 130, 1)',
        borderWidth: 1,
        borderRadius: 10, // Add this line for semi-round bars
      },
    ],
  }), []);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter',
            size: 14,
            weight: 500,
          },
          usePointStyle: true,
          padding: 25
        }
      },
      title: {
        display: true,
        text: 'Participants by Company',
        align: 'start', // Align the title to the left
        font: {
          family: 'Inter',
          size: 24,
          weight: 'bold' as const,
        },
        padding: {
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Inter',
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Inter',
          size: 14,
        },
        padding: 10,
        cornerRadius: 4,
        caretSize: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12,
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12,
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    }
  }), []);

  const columnDefs = useMemo<agGrid.ColDef[]>(() => [
    { field: "company", filter: "agTextColumnFilter", sortable: true, flex: 1.2, headerClass: 'custom-header', cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
    { field: "recordKeeper", filter: "agTextColumnFilter", sortable: true, flex: 1.2, headerClass: 'custom-header', cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
    { field: "numParticipants", filter: "agNumberColumnFilter", sortable: true, flex: 1, headerClass: 'custom-header', cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
    { field: "autoEnrollment", filter: "agTextColumnFilter", sortable: true, flex: 1, headerClass: 'custom-header', cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
    { field: "vesting", filter: "agTextColumnFilter", sortable: true, flex: 1, headerClass: 'custom-header', cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
    { field: "profitSharing", filter: "agTextColumnFilter", sortable: true, flex: 1, headerClass: 'custom-header', cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
    { field: "marketingPermission", filter: "agTextColumnFilter", sortable: true, flex: 1.2, headerClass: 'custom-header', cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="outline"
          className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all duration-200 shadow-lg"
          onClick={() => handleOpenModal(params.data)}
        >
          View Details
        </Button>
      ),
      flex: 1,
      headerClass: 'custom-header',
      cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
    },
  ], []);

  const handleOpenModal = (rowData: typeof sampleData[0]) => {
    setSelectedRow(rowData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="ag-theme-alpine grid-container">
      <div className="dashboard-header">
        <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-gray-900 first:mt-0 mb-2">
          Welcome, Abbey
        </h2>
        <p className="text-gray-600 text-lg mb-10">Here's what's happening with your plans today.</p>
      </div>
      <div className="summary">
        <div className="stat-card shadow-lg rounded-lg p-4 bg-white">
          <div className="stat-icon-wrapper">
            <FaDollarSign className="stat-icon text-purple-700" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-3">Total Assets</h3>
          <p className="text-4xl font-bold text-purple-700 mb-2">$4.2M</p>
          <span className="text-green-600 text-sm font-medium flex items-center">
            <FaArrowUp className="w-4 h-4 mr-1" />
            12% from last month
          </span>
        </div>
        <div className="stat-card shadow-lg rounded-lg p-4 bg-white">
          <div className="stat-icon-wrapper">
            <FaChartBar className="stat-icon text-purple-700" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-3">Total Plans</h3>
          <p className="text-4xl font-bold text-purple-700 mb-2">31</p>
          <span className="text-green-600 text-sm font-medium flex items-center">
            <FaArrowUp className="w-4 h-4 mr-1" />
            4 new this month
          </span>
        </div>
        <div className="stat-card shadow-lg rounded-lg p-4 bg-white">
          <div className="stat-icon-wrapper">
            <FaUsers className="stat-icon text-purple-700" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-3">Total Participants</h3>
          <p className="text-4xl font-bold text-purple-700 mb-2">1,253</p>
          <span className="text-green-600 text-sm font-medium flex items-center">
            <FaArrowUp className="w-4 h-4 mr-1" />
            85 new this month
          </span>
        </div>
      </div>
      <div className="chart-container">
        <Bar options={chartOptions} data={chartData} />
      </div>
      <div className="table-header">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Plans Overview</h3>
      </div>
      <AgGridReact
        className="ag-grid"
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'
        rowHeight={72}
        headerHeight={52}
        animateRows={true}
      />
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[600px] transition-transform transform-gpu duration-300 ease-in-out">
          <DialogTitle className="text-2xl font-semibold mb-6 text-gray-900">Company Details</DialogTitle>
          <div className="space-y-4">
            <div className="detail-row">
              <span className="font-medium text-gray-700">Record Keeper:</span>
              <span className="text-gray-900 font-semibold">{selectedRow?.recordKeeper}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-700">Number of Participants:</span>
              <span className="text-gray-900 font-semibold">{selectedRow?.numParticipants}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-700">Auto Enrollment:</span>
              <span className="text-gray-900 font-semibold">{selectedRow?.autoEnrollment}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-700">Vesting:</span>
              <span className="text-gray-900 font-semibold">{selectedRow?.vesting}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-700">Profit Sharing:</span>
              <span className="text-gray-900 font-semibold">{selectedRow?.profitSharing}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-700">Marketing Permission:</span>
              <span className="text-gray-900 font-semibold">{selectedRow?.marketingPermission}</span>
            </div>
          </div>
          <DialogClose asChild>
            <Button className="mt-6 w-full bg-purple-700 text-white hover:bg-purple-800 transition-colors duration-200 font-medium shadow-lg" variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .grid-container {
          height: 100%;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 3rem;
          background-color: #f8fafc;
          font-family: 'Inter', sans-serif; /* Apply Inter font */
        }
        .dashboard-header {
          margin-bottom: 3rem;
        }
        .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        .chart-container {
          height: 500px; /* Increase the height */
          width: 100%; /* Ensure it takes full width */
          margin-bottom: 3rem;
        }
        .stat-card {
          background-color: white;
          padding: 2.5rem;
          border-radius: 1.25rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .stat-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background-color: #e5e7eb;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }
        .stat-icon {
          font-size: 1.5rem;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
        }
        .detail-row span {
          display: block;
        }
        .ag-theme-alpine .ag-header-cell {
          background-color: #4c51bf;
          color: white;
          font-weight: bold;
        }
        .ag-theme-alpine .ag-cell {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Grid;
