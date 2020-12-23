import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid } from '@material-ui/core';
import { AddDialog } from './components';

const FormDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Grid container justify="left">
        <Button variant="outlined" color="primary" startIcon={<PersonAddIcon />} onClick={handleClickOpen}>
          Add Trainee
        </Button>

      </Grid>
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleClose}
      />
    </div>
  );
};
export default FormDialog;
