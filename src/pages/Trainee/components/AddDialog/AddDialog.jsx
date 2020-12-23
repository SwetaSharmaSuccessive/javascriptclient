import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogActions, Grid, TextField, DialogContent,
  DialogContentText, DialogTitle, InputAdornment,
} from '@material-ui/core';

import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

import * as yup from 'yup';

const AddDialog = (props) => {
  const { open, onClose, onSubmit } = props;
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const handleChange = (field) => (event) => {
    setState({ ...state, [field]: event.target.value });
  };
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };
  const schema = yup.object().shape({
    name: yup.string().required('Name is a required field').min(3, 'Min 3 characters'),
    email: yup.string().email('Enter valid email')
      .required('Email is a required field'),
    password: yup.string()
      .required('Password is a required field')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is a required field'),
  });
  const hasErrors = () => {
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };
  const isTouched = () => {
    const {
      name, email, password, confirmPassword,
    } = touched;
    if (name || email || password || confirmPassword) {
      return true;
    }
    return false;
  };
  const getError = (field) => {
    if (touched[field] && hasErrors()) {
      try {
        schema.validateSyncAt(field, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };
  const renderFormField = ({
    label, type, icon, field,
  }) => (
    <TextField
      error={!!getError(field)}
      variant="outlined"
      margin="dense"
      label={label}
      type={type}
      fullWidth
      helperText={getError(field)}
      onChange={handleChange(field)}
      onBlur={() => handleBlur(field)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  );
  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
        <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Trainee details.
          </DialogContentText>
          <div>
            <Grid container fullWidth>
              <Grid item md={12} fullWidth>
                {
                  renderFormField({
                    label: 'Name',
                    field: 'name',
                    type: 'text',
                    icon: <PersonOutlineIcon />,
                  })
                }
              </Grid>
              <Grid item md={12} fullWidth>
                {
                  renderFormField({
                    label: 'Email',
                    field: 'email',
                    type: 'Email',
                    icon: <EmailOutlinedIcon />,
                  })
                }
              </Grid>
              <Grid item md={5.5}>
                {
                  renderFormField({
                    label: 'Password',
                    field: 'password',
                    type: 'password',
                    icon: <VisibilityOffOutlinedIcon />,
                  })
                }
              </Grid>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item md={5}>
                {
                  renderFormField({
                    label: 'Confirm Password',
                    field: 'confirmPassword',
                    type: 'password',
                    icon: <VisibilityOffOutlinedIcon />,
                  })
                }
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button disabled={(hasErrors()) || !isTouched()} onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onSubmit: func.isRequired,
};
export default AddDialog;
