import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { addTraining, getCustomers } from '../api';
import { AddTrainingProps, CustomerData } from '../types';
import TrainingContent from './TrainingContent';

export default function AddTraining({ fetchTrainings }: AddTrainingProps) {
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: ''
  });

  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    getCustomers()
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training)
      .then(() => fetchTrainings())
      .then(() => handleClose())
      .catch(err => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new training</DialogTitle>
        <DialogContent>
          <TrainingContent training={training} setTraining={setTraining} customers={customers} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
