import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import SectionsList from './../components/sections/SectionsList';
import EditSection from './../components/sections/EditSection';

class Sections extends Component {

  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <SectionsList params={this.props.params} />
          </aside>
          <main className="page-content__main">
            <EditSection params={this.props.params} />
          </main>
        </div>
      </div>
    );
  }
}

Sections.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Sections;
