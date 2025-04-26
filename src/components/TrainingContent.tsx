import { TextField, MenuItem } from "@mui/material";
import { TrainingContentProps } from "../types";

export default function TrainingContent({ training, setTraining, customers }: TrainingContentProps) {
  return (
    <>
      <TextField
        required
        margin="dense"
        label="Date"
        type="datetime-local"
        fullWidth
        variant="standard"
        value={training.date}
        onChange={e => setTraining({ ...training, date: e.target.value })}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        required
        margin="dense"
        label="Duration (minutes)"
        type="number"
        fullWidth
        variant="standard"
        value={training.duration}
        onChange={e => setTraining({ ...training, duration: e.target.value })}
      />
      <TextField
        required
        margin="dense"
        label="Activity"
        fullWidth
        variant="standard"
        value={training.activity}
        onChange={e => setTraining({ ...training, activity: e.target.value })}
      />
      <TextField
        required
        select
        margin="dense"
        label="Customer"
        fullWidth
        variant="standard"
        value={training.customer}
        onChange={e => setTraining({ ...training, customer: e.target.value })}
      >
        {customers.map((c) => (
          <MenuItem key={c._links.customer.href} value={c._links.customer.href}>
            {c.firstname} {c.lastname}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
