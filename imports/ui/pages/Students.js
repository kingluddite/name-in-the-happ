import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import StudentsList from './../components/students/StudentsList';
import EditStudent from './../components/students/EditStudent';

class Students extends Component {

  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <StudentsList params={this.props.params} />
          </aside>
          <main className="page-content__main">
            <EditStudent params={this.props.params} />
          </main>
        </div>
      </div>
    );
  }
}

Students.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Students;
