import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, themeMaterial } from 'ag-grid-community';
import { Customer } from '../types';
import { getCustomers, deleteCustomer } from '../api';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);
  const gridRef = useRef<AgGridReact<Customer>>(null);

  const [columnDefs] = useState<ColDef<Customer>[]>([ 
    { field: "firstname", headerName: "First name", filter: true, width: 130 },
    { field: "lastname", headerName: "Last name", filter: true, width: 130 },
    { field: "email", filter: true, width: 180 },
    { field: "phone", filter: true, width: 140 },
    { field: "streetaddress", headerName: "Address", filter: true, width: 160 },
    { field: "postcode", filter: true, width: 130 },
    { field: "city", filter: true, width: 120 },
    {
      width: 80,
      cellRenderer: (params: ICellRendererParams) =>
        <EditCustomer data={params.data} fetchCustomers={fetchCustomers} />
    },
    {
      width: 80,
      cellRenderer: (params: ICellRendererParams) =>
        <Button size="small" color="error" onClick={() => handleDelete(params)}>
          <DeleteIcon fontSize="small" />
        </Button>
    }
  ]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    getCustomers()
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
  };

  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm("Are you sure?")) {
      deleteCustomer(params.data._links.customer.href)
        .then(() => fetchCustomers())
        .then(() => setOpen(true))
        .catch(err => console.error(err));
    }
  };

  const handleExport = () => {
    gridRef.current?.api.exportDataAsCsv({
      onlySelected: false,
      allColumns: false,
      columnKeys: [
        'firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city'
      ]
    });
  };

  return (
    <>
      <AddCustomer fetchCustomers={fetchCustomers} />
      <Button variant="outlined" onClick={handleExport} sx={{ mb: 2, ml: 2 }}>
        Export CSV
      </Button>
      <div style={{ width: '100%', height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={customers}
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
        message="Customer deleted successfully"
      />
    </>
  );
}
