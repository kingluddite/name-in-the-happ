import React, { Component } from 'react';

// collections

// components
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
              {/* <button className="button button--round"
              onClick={() => Sections.remove(_id)}>X</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sections;
