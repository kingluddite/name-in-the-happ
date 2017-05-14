import React, { Component } from 'react';

// components
import AddPresentation from './../components/presentations/AddPresentation';
import PresentationsList from './../components/presentations/PresentationsList';

class Presentations extends Component {

  render() {
    return (
      <div>
        <AddPresentation />
        <PresentationsList />
      </div>
    );
  }
}

export default Presentations;
