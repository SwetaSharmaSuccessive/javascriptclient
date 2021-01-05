/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components/Table';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';
import trainees from './data/trainee';

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

class TraineeList extends React.Component {
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
      rowsPerPage: 10,
      editData: {},
      deleteData: {},
    };
  }

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

  render() {
    const {
      EditOpen, Open, order, orderBy, page, rowsPerPage, editData, DeleteOpen, deleteData,
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
          data={trainees}
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
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
        />
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
