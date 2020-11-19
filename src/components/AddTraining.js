import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTraining(props){

    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState({//default value
       date:'',
       duration: '',
       activity: '',
       customer: props.customer.links[0].href
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    }
return(

    <div>
        <Button  size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>
                    <TextField
                        autoFocus
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        margin="dense"
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        fullWidth
                    />

                </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
</div>
);
}
