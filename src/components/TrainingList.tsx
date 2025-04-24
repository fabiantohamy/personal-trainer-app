import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from "ag-grid-community";
import dayjs from "dayjs";
import { getTrainings } from "../api";
import { Training } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

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
  ]);

  useEffect(() => {
    getTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ width: "90%", height: 500 }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        theme={themeMaterial}
      />
    </div>
  );
}
