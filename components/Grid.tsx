import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const chartData = {
    labels: sampleData.map(item => item.company),
    datasets: [
      {
        label: 'Number of Participants',
        data: sampleData.map(item => item.numParticipants),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Roboto',
            size: 12,
          }
        }
      },
      title: {
        display: true,
        text: 'Participants by Company',
        font: {
          family: 'Roboto',
          size: 16,
          weight: 'bold',
        }
      },
    },
  };

  const columnDefs = React.useMemo<agGrid.ColDef[]>(() => [
    { field: "company", filter: "agTextColumnFilter", sortable: true, flex: 1 },
    { field: "recordKeeper", filter: "agTextColumnFilter", sortable: true, flex: 1 },
    { field: "numParticipants", filter: "agNumberColumnFilter", sortable: true, flex: 1 },
    { field: "autoEnrollment", filter: "agTextColumnFilter", sortable: true, flex: 1 },
    { field: "vesting", filter: "agTextColumnFilter", sortable: true, flex: 1 },
    { field: "profitSharing", filter: "agTextColumnFilter", sortable: true, flex: 1 },
    { field: "marketingPermission", filter: "agTextColumnFilter", sortable: true, flex: 1 },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="outline"
          className="px-4 py-2 rounded-md hover:bg-blue-50"
          onClick={() => handleOpenModal(params.data)}
        >
          View Details
        </Button>
      ),
      flex: 1,
    },
  ], []);

  const handleOpenModal = (rowData: any) => {
    setSelectedRow(rowData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="ag-theme-alpine grid-container">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        Welcome, Abbey
      </h2>
      <div className="summary">
        <div className="stat-card">
          <h3 className="text-lg font-medium text-gray-600">Total Assets</h3>
          <p className="text-2xl font-bold text-blue-600">$4.2M</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-medium text-gray-600">Total Plans</h3>
          <p className="text-2xl font-bold text-blue-600">31</p>
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-medium text-gray-600">Total Participants</h3>
          <p className="text-2xl font-bold text-blue-600">1,253</p>
        </div>
      </div>
      <div className="chart-container">
        <Bar options={chartOptions} data={chartData} />
      </div>
      <AgGridReact
        className="ag-grid"
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={50}
        domLayout='autoHeight'
      />
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="text-xl font-semibold mb-4">Company Details</DialogTitle>
          <div className="space-y-4">
            <div className="detail-row">
              <span className="font-medium text-gray-600">Record Keeper:</span>
              <span>{selectedRow?.recordKeeper}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-600">Number of Participants:</span>
              <span>{selectedRow?.numParticipants}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-600">Auto Enrollment:</span>
              <span>{selectedRow?.autoEnrollment}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-600">Vesting:</span>
              <span>{selectedRow?.vesting}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-600">Profit Sharing:</span>
              <span>{selectedRow?.profitSharing}</span>
            </div>
            <div className="detail-row">
              <span className="font-medium text-gray-600">Marketing Permission:</span>
              <span>{selectedRow?.marketingPermission}</span>
            </div>
          </div>
          <DialogClose asChild>
            <Button className="mt-4" variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .grid-container {
          height: 100%;
          width: 100%;
          padding: 2rem;
          background-color: #f8fafc;
        }
        .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .chart-container {
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          height: 400px;
          margin-bottom: 2rem;
        }
        .ag-grid {
          font-family: 'Roboto', sans-serif;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default Grid;