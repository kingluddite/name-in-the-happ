import React, { Component } from 'react';

// components
import PresentationsListHeader from './../components/presentations/PresentationsListHeader';
import PresentationsList from './../components/presentations/PresentationsList';

class Presentations extends Component {

  render() {
    return (
      <div>
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

export default Presentations;
