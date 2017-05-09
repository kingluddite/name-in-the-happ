import React, { Component } from 'react';
import { SectionsCollection } from './../../../api/sections/sections-collection';

class AddSection extends Component {
  handleSubmit(e) {
    const name = this.refs.name.value.trim();
    const code = this.refs.code.value.trim();

    e.preventDefault();

    if (name) {
      this.refs.name.value = '';
      this.refs.code.value = '';

      SectionsCollection.insert({
        name,
        code
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Add Your Section/Class</h2>
        <div className="item">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
            <input className="form__input" type="text" ref="name" placeholder="Section Name" />
            <input type="text" ref="code" placeholder="Class Code" />
            <button>Create Section</button>
          </form>
        </div>
      </div>
    );
  }
};

export default AddSection;
