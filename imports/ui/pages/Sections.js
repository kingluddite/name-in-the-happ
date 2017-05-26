import React, { Component } from 'react';

// components
import SectionsList from './../components/sections/SectionsList';
import EditSection from './../components/sections/EditSection';

class Sections extends Component {
  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <SectionsList />
          </aside>
          <main className="page-content__main">
            <EditSection />
          </main>
        </div>
      </div>
    );
  }
}

export default Sections;
