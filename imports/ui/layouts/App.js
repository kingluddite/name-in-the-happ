import React from 'react';
import PropTypes from 'prop-types';
import Header from './../components/Header';

const App = ({ children }) => (
  <div>
    <Header />
      <div className="page-content">
        { children }
      </div>
      {/* END .page-content */}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
