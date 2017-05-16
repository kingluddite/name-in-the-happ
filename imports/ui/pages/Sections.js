import React, { Component } from 'react';

// components
import AddSection from './../components/sections/AddSection';
import SectionsList from './../components/sections/SectionsList';

class Sections extends Component {

  render() {
    // const { _id, name, code } = this.props.section;
    return (
      <div className="page-content">
        <aside className="page-content__sidebar">
          <AddSection />
        </aside>
        <main className="page-content__main">
          <SectionsList />
        </main>
      </div>
    );
  }
}

export default Sections;
