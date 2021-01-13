/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableComponent } from '../../components/Table';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';
import callApi from '../../libs/utils/api';
import { MyContext } from '../../contexts/index';

const useStyles = (theme) => ({
  traineeButton: {
    marginRight: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

let trainee = [];

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Open: false,
      EditOpen: false,
      DeleteOpen: false,
      selected: '',
      orderBy: '',
      order: '',
      page: 0,
      dataObj: [],
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
      count: 0,
      limit: 20,
      skip: 0,
    };
  }

  handleUser = (status, data) => {
    this.setState({ Open: status }, () => { console.log(data); });
  };

  handleClose = () => {
    this.setState({ Open: false });
  }

  handleEditButton = (data) => {
    this.setState({ EditOpen: false }, () => { console.log('Edited Item ', data.data); });
  }

  handleDeleteButton = (data) => {
    this.setState({ DeleteOpen: false }, () => { console.log('Deleted Item ', data.data); });
  };

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data, this.state));
  };

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, editData: data });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ DeleteOpen: true, deleteData: data });
  }

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  componentDidMount = () => {
    const { skip, limit } = this.state;
    this.setState({ loading: true });
    const value = this.context;
    callApi({}, 'get', `/trainee?skip=${skip}&limit=${limit}`).then((response) => {
      trainee = response.data.data;
      this.setState({ dataObj: response.data });
      if (response.data === undefined) {
        this.setState({
          loading: false,
          message: 'This is an error while displaying Trainee',
        }, () => {
          const { message } = this.state;
          value.openSnackBar(message, 'error');
        });
      } else {
        const { records } = response.data;
        this.setState({ dataObj: records, loading: false, Count: 100 });
        return response;
      }
    });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  render() {
    const {
      EditOpen, Open, order, orderBy, page,
      rowsPerPage, editData, DeleteOpen, deleteData, Count,
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.dialog}>
          <Button className={classes.traineeButton} variant="outlined" color="primary" onClick={() => this.setState({ Open: true })}>
            ADD TRAINEELIST
          </Button>
          <AddDialog
            onClose={this.handleClose}
            open={Open}
            onSubmit={this.handleUser}
          />
        </div>
        <EditDialog
          onClose={this.handleEditButton}
          open={EditOpen}
          onSubmit={this.handleEditButton}
          data={editData}
        />
        <DeleteDialog
          data={deleteData}
          onClose={this.handleDeleteButton}
          onSubmit={this.handleDeleteButton}
          open={DeleteOpen}
        />
        <TableComponent
          id="id"
          data={trainee}
          columns={[
            {
              field: 'name',
              lable: 'Name',
            },
            {
              field: 'email',
              lable: 'Email Address',
              format: (value) => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              lable: 'Date',
              align: 'right',
              format: getDateFormatted,
            },
          ]}
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={Count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </>
    );
  }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
