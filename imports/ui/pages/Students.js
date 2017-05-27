import React, { Component } from 'react';
import { Session } from 'meteor/session';

// components
import StudentsList from './../components/students/StudentsList';
import EditStudent from './../components/students/EditStudent';

class Students extends Component {

  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <StudentsList />
          </aside>
          <main className="page-content__main">
            <EditStudent />{Session.get('presentationId')}
          </main>
        </div>
      </div>
    );
  }
}

export default Students;
