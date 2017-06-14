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
          <aside className="page-content__sidebar" onClick={this.handleClick.bind(this)}>
            <SectionsList />
          </aside>
          <main className="page-content__main" onKeyUp={this.handleKeyUp.bind(this)}>
            <EditSection myFunc={this.siblingBFunc.bind(this)} />
          </main>
        </div>
      </div>
    );
  }
}

export default Sections;
