import React, { Component } from 'react';

// components
import PresentationsList from './../components/presentations/PresentationsList';
import EditPresentation from './../components/presentations/EditPresentation';

class Presentations extends Component {

  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <PresentationsList />
          </aside>
          <main className="page-content__main">
            <EditPresentation />
          </main>
        </div>
      </div>
    );
  }
}

export default Presentations;
