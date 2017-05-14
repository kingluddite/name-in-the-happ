import React, { Component } from 'react';

// components
import AddSection from './../components/sections/AddSection';
import SectionsList from './../components/sections/SectionsList';

class Sections extends Component {

  render() {
    // const { _id, name, code } = this.props.section;
    return (
      <div>
        <AddSection />
        <SectionsList />
      </div>
    );
  }
}

export default Sections;
