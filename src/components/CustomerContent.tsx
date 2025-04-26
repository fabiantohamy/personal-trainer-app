import { TextField } from '@mui/material';
import { CustomerContentProps } from '../types';

export default function CustomerContent({ customer, setCustomer }: CustomerContentProps) {
  return (
    <>
      <TextField
        required
        margin="dense"
        label="First name"
        fullWidth
        variant="standard"
        value={customer.firstname}
        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Last name"
        fullWidth
        variant="standard"
        value={customer.lastname}
        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Email"
        fullWidth
        variant="standard"
        value={customer.email}
        onChange={e => setCustomer({ ...customer, email: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Phone"
        fullWidth
        variant="standard"
        value={customer.phone}
        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Street address"
        fullWidth
        variant="standard"
        value={customer.streetaddress}
        onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Postcode"
        fullWidth
        variant="standard"
        value={customer.postcode}
        onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="City"
        fullWidth
        variant="standard"
        value={customer.city}
        onChange={e => setCustomer({ ...customer, city: e.target.value })}
      />
    </>
  );
}
