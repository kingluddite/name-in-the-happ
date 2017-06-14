import React, { Component } from 'react';

// components
import SectionsList from './../components/sections/SectionsList';
import EditSection from './../components/sections/EditSection';

class Sections extends Component {
  handleKeyUp(e) {
    console.log(e);
  }
  handleClick(e) {
    console.log( 'handle click' )
  }
  siblingBFunc() {
    return 'hello';
  }
  render() {
    return (
      <div>
          <div className="page-content">
          <aside className="page-content__sidebar">
            <SectionsList params={this.props.params} />
          </aside>
          <main className="page-content__main">
            <EditSection params={this.props.params}  />
          </main>
        </div>
      </div>
    );
  }
}

export default Sections;
