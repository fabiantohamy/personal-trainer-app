import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';
import { Customer } from '../types';
import { getCustomers } from '../api';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [columnDefs] = useState<ColDef<Customer>[]>([ 
    { field: "firstname", headerName: "First name", filter: true, width: 130 },
    { field: "lastname", headerName: "Last name", filter: true, width: 130 },
    { field: "email", filter: true, width: 180 },
    { field: "phone", filter: true, width: 150 },
    { field: "streetaddress", headerName: "Address", filter: true, width: 180 },
    { field: "postcode", filter: true, width: 130 },
    { field: "city", filter: true, width: 130 }
  ]);

  useEffect(() => {
    getCustomers()
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ width: '90%', height: 500 }}>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        theme={themeMaterial}
      />
    </div>
  );
}
