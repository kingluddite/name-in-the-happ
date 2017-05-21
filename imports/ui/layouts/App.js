import React from 'react';
import PropTypes from 'prop-types';
import Header from './../components/Header';

const App = ({ children }) => {
  return (
    <div>
      <Header title="Name from the Happ" />
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
