import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import Header from './../components/Header';

const App = ({ children }) => {
  const pageTitle = Session.get('pageTitle') || undefined;
  return (
    <div>
      <Header title="Name from the Happ" pageTitle={pageTitle} />
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
