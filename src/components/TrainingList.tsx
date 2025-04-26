import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, themeMaterial } from "ag-grid-community";
import dayjs from "dayjs";
import { getTrainings, deleteTraining } from "../api";
import { Training } from "../types";
import AddTraining from "./AddTraining";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import DeleteIcon from '@mui/icons-material/Delete';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [open, setOpen] = useState(false);

  const [columnDefs] = useState<ColDef<Training>[]>([
    {
      field: "date",
      headerName: "Date",
      filter: true,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
      width: 200,
    },
    { 
      field: "activity", 
      filter: true, 
      width: 200,
    },
    {
      field: "duration",
      headerName: "Duration (min)",
      filter: true,
      width: 200,
    },
    {
      headerName: "Customer",
      filter: true,
      width: 200,
      valueGetter: params => {
        const customer = params.data?.customer;
        return customer ? `${customer.firstname} ${customer.lastname}` : '';
      }
    },
    {
      width: 80,
      cellRenderer: (params: ICellRendererParams<Training>) =>
        <Button size="small" color="error" onClick={() => handleDelete(params)}>
          <DeleteIcon fontSize="small" />
        </Button>
    }
  ]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    getTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm("Are you sure you?")) {
      deleteTraining(params.data.id)
        .then(() => fetchTrainings())
        .then(() => setOpen(true))
        .catch(err => console.error(err));
    }
  };

  return (
    <>
      <AddTraining fetchTrainings={fetchTrainings} />
      <div style={{ width: "80%", height: 500 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          theme={themeMaterial}
      />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Training deleted successfully"
      />
    </>
  );
}
