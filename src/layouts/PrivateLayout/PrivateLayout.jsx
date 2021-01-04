import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components';

const PrivateLayout = ({ children }) => (
  <div className="main">
    <NavBar />
    {children}
  </div>
);

PrivateLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PrivateLayout;
