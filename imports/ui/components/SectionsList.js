import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
// import FlipMove from 'react-flip-move';

// collections
import { SectionsCollection } from './../../api/sections/sections-collection';

// components
import Sections from './../pages/sections/Sections';

export class SectionsList extends Component {

  handleLogout() {
    console.log('logout');
    Accounts.logout();
  }

  renderSections() {
    const { sections } = this.props;
    if (sections.length === 0 ) {
      return (
        <div className="item">
          <p className="item__message">There are currently no class sections.</p>
        </div>
      );
    } else {
      return sections.map((section) => {
        return (
          <div>
            <Section key={section._id} section={section} />
            test
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        {/* <FlipMove maintainContainerHeight={true}> */}
          {/* {this.renderSections()} */}
          Test
        {/* </FlipMove> */}
        <button onClick={this.handleLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}

SectionsList.propTypes = {
  // sections: PropTypes.array.isRequired
}

export default SectionsList;

