import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import PresentationsList from './../components/presentations/PresentationsList';
import EditPresentation from './../components/presentations/EditPresentation';

class Presentations extends Component {

  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <PresentationsList sectionId={this.props.params._id} />
          </aside>
          <main className="page-content__main">
            <EditPresentation sectionId={this.props.params._id} />
          </main>
        </div>
      </div>
    );
  }
}

Presentations.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Presentations;
