import React, { Component } from 'react';
import PropTypes from 'prop-types';

// collections
import { Sections } from './../../api/collections/sections';

class Section extends Component {

  render() {
    const { _id, name, code } = this.props.section;
    return (
      <div className="item">
        <div className="section">
          <div>
            <h3 className="section__name">{name}</h3>
            <p className="section__stats">{code}</p>
          </div>
          <div className="section__actions">
            <button className="button button--round" onClick={() => Sections.remove(_id)}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  section: PropTypes.object.isRequired
}

export default Section;