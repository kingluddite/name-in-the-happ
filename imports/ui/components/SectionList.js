import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import Section from './Section';

class SectionList extends Component {

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
            <h1>Section List</h1>
            <Section key={section._id} section={section} />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        {this.renderSections()}
      </div>
    );
  }
}

SectionList.propTypes = {
  sections: PropTypes.array.isRequired
}

export default SectionList;