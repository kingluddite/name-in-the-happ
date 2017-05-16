import React, { Component } from 'react';

// components
import AddPresentation from './../components/presentations/AddPresentation';
import PresentationsList from './../components/presentations/PresentationsList';
import PresentationView from './PresentationView';

class Presentations extends Component {

  render() {
    return (
      <div>
          <aside className="page-content__sidebar">
            <AddPresentation />
            <PresentationsList />
          </aside>
          <main className="page-content__main">
            <PresentationView />
          </main>
      </div>
    );
  }
}

export default Presentations;
