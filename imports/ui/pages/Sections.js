import React, { Component } from 'react';

// components
import PresentationsListHeader from './../components/presentations/PresentationsListHeader';
import PresentationsList from './../components/presentations/PresentationsList';

class Sections extends Component {

  render() {
    // const { _id, name, code } = this.props.section;
    return (
      <div className="page-content">
        <aside className="page-content__sidebar">
          <PresentationsListHeader />
        </aside>
        <main className="page-content__main">
          <PresentationsList />
        </main>
      </div>
    );
  }
}

export default Sections;
