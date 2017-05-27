import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import StudentsList from './../components/students/StudentsList';
import EditStudent from './../components/students/EditStudent';

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentationId: this.props.location.state.presentationId,
    };
  }
  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <StudentsList presentationId={this.state.presentationId} />
          </aside>
          <main className="page-content__main">
            <EditStudent presentationId={this.state.presentationId} />
          </main>
        </div>
      </div>
    );
  }
}

Students.propTypes = {
  location: PropTypes.object,
};

export default Students;
