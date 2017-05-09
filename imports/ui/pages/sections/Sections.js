import React, { Component } from 'react';
import PropTypes from 'prop-types';

// collections
import { SectionsCollection } from './../../../api/sections/sections-collection';

// components
import SectionsList from './../../components/SectionsList';
import AddSection from './AddSection';

class Sections extends Component {

  render() {
    // const { _id, name, code } = this.props.section;
    return (
      <div>
        <AddSection />
        <div className="item">
          <div className="section">
            <div>
              {/* <h3 className="section__name">{name}</h3>
              <p className="section__stats">{code}</p> */}
            </div>
            <div className="section__actions">
              {/* <button className="button button--round" onClick={() => Sections.remove(_id)}>X</button> */}
            </div>
          </div>
        </div>
        <SectionsList />
      </div>
    );
  }
}

Sections.propTypes = {
  // section: PropTypes.object.isRequired
}

export default Sections;