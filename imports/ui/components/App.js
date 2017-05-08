import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import AddSection from './AddSection';
import SectionList from './SectionList';

class App extends Component {

  render() {

    return (
      <div>
        <Header title={this.props.title} />
        <div className="wrapper">
          <SectionList sections={this.props.sections} />
          <AddSection />
        </div>
      </div>
    );
  }
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired
};

export default App;