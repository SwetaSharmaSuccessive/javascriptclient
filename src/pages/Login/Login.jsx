/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, InputAdornment,
  CardContent, Typography, Card, Avatar, CssBaseline, withStyles,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import ls from 'local-storage';
import callApi from '../../libs/utils/api';
import { MyContext } from '../../contexts/index';

const LoginStyle = (theme) => ({
  main: {
    width: 350,
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(62),
  },
  icon: {
    background: 'red',
    marginLeft: theme.spacing(19),
    marginTop: theme.spacing(2),
  },
});

class Login extends React.Component {
  schema = yup.object().shape({
    email: yup.string()
      .trim().email().required('Email is a required field'),
    password: yup.string()
      .required('Password is a required field')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      touched: {
        Email: false,
        Password: false,
      },
    };
  }

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/trainee" />;
    }
    return null;
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  onClickHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
      hasErrors: true,
    });
    const res = await callApi(data, 'post', '/login');
    console.log('resp', res);
    this.setState({ loading: false });
    const responseData = ls.get('token');
    console.log('resatapD', responseData);
    if (responseData && responseData.status === 200) {
      this.setState({
        redirect: true,
        hasErrors: false,
        message: 'Login successfully',
      });
      const { message } = this.state;
      openSnackBar(message, 'success');
    } else {
      this.setState({
        message: 'Email or Password is incorrect',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
        return '';
      } catch (err) {
        return err.message;
      }
    }
    return '';
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, loading,
    } = this.state;
    return (
      <>
        <div className={classes.main}>
          <CssBaseline />
          <Card open aria-labelledby="form-dialog-title">
            <Avatar className={classes.icon}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h4" align="center">Login</Typography>
            <CardContent>
              <form>
                <div>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email Address"
                    variant="outlined"
                    helperText={this.getError('email')}
                    error={!!this.getError('email')}
                    onChange={this.handleChange('email')}
                    onBlur={() => this.isTouched('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    required
                    type="password"
                    fullWidth
                    id="outlined-required"
                    label="Password"
                    variant="outlined"
                    helperText={this.getError('password')}
                    error={!!this.getError('password')}
                    onChange={this.handleChange('password')}
                    onBlur={() => this.isTouched('password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                &nbsp;&nbsp;
                <div>
                  <MyContext.Consumer>
                    {({ openSnackBar }) => (

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.onClickHandler({ email, password }, openSnackBar);
                        }}
                        disabled={loading || this.hasErrors()}
                        fullWidth
                      >
                        {loading && (
                          <CircularProgress />
                        )}
                        {loading && <span>Signing in</span>}
                        {!loading && <span>Sign in</span>}
                        {this.renderRedirect()}
                      </Button>
                    )}
                  </MyContext.Consumer>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(LoginStyle)(Login);
