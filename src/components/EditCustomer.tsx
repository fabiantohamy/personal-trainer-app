import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Customer, EditCustomerProps } from '../types';
import CustomerContent from './CustomerContent';

export default function EditCustomer({ data, fetchCustomers }: EditCustomerProps) {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setCustomer({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    fetch(data._links.customer.href, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (!response.ok) throw new Error('Error updating customer');
        return response.json();
      })
      .then(fetchCustomers)
      .then(handleClose)
      .catch(err => console.error(err));
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <CustomerContent customer={customer} setCustomer={setCustomer} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
