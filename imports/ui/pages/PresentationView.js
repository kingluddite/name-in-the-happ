import React, { Component } from 'react';

class Presentation extends Component {

  render() {
    if (this.props.presentation) {
      return (
        <div className="editor">
          <input
            value={this.state.title}
            placeholder="Note Title" type="text" onChange={this.handleTitleChange.bind(this)} />
            <textarea
              value={this.state.body}
              placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
              <button onClick={this.handleDeleteNoteClick.bind(this)}>Delete Note</button>
            </div>
      );
    }
    return (
      <div className="presentation">
        <p>
          {/* { this.props.selectedPresentationId ? 'Note not found.' : 'Pick or create a note to get started.'} */}
        </p>
      </div>
    );
  }
}

export default Presentation;

