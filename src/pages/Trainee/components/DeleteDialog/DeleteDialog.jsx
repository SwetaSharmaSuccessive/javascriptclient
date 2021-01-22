/* eslint-disable no-console */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { MyContext } from '../../../../contexts/index';
import callApi from '../../../../libs/utils/api';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      open, onClose, data,
    } = this.props;
    const { loading } = this.state;
    const onDeleteHandler = async (openSnackBar) => {
      this.setState({
        loading: true,
      });
      const { onSubmit } = this.props;
      const { originalId } = data;
      const response = await callApi({}, 'delete', `/trainee/${originalId}`);
      this.setState({ loading: false });
      if (response && response.status === 200) {
        this.setState({
          message: 'Trainee Deleted Successfully ',
        }, () => {
          const { message } = this.state;
          onSubmit(data);
          openSnackBar(message, 'success');
          onClose();
        });
      } else {
        this.setState({
          message: 'Error While Deleting Trainee',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'error');
        });
      }
    };

    return (
      <Dialog
        open={open}
        onClose={() => this.handleClose()}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
        <DialogContentText style={{ marginLeft: 25 }}>
          Do you really want to remove the trainee?
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
              {({ openSnackBar }) => (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    onDeleteHandler(openSnackBar);
                  }}
                >
                  {loading && (
                    <CircularProgress size={15} />
                  )}
                  {loading && <span>Deleting</span>}
                  {!loading && <span>Delete</span>}
                </Button>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </DialogContentText>
      </Dialog>
    );
  }
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default DeleteDialog;
