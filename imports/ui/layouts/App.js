import React from 'react';
import PropTypes from 'prop-types';
// import AppNavigation from '../components/AppNavigation';
import PageHeader from './../components/PageHeader';

const App = ({ children }) => (
  <div>
    <PageHeader />
    <div>
      { children }
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
