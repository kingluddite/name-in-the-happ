import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';

class SectionsListItem extends Component {
  handleClickDelete() {
    Meteor.call('sections.remove', this.props.section._id);
  }

  handleClickItem() {
    const id = this.props.section._id;
    Session.set('currentSectionId', id);
    browserHistory.push(`/sections/${id}`);
  }

  handleClickEdit() {
    const id = this.props.section._id;
    Session.set('currentSectionId', id);
    browserHistory.push(`/sections/${id}/edit`);
  }
  render() {
    return (
      <div className="item">
       <div className="sections">
         <div onClick={this.handleClickItem.bind(this)}>
           <h2 className="item__name">{this.props.section.name}</h2>
           <p className="item__code">{this.props.section.code}</p>
         </div>
       <div className="sections__actions">
         <button
           onClick={this.handleClickEdit.bind(this)}
           className="button button--edit button--round">
           <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
         </button>
         <button
           className="button button--delete button--round"
           onClick={this.handleClickDelete.bind(this)}>
           <i className="fa fa-trash" aria-hidden="true"></i>
         </button>
         </div>
         {/* END .sections__actions */}
       </div>
       {/* END .sections */}
     </div>
    //  END .item
    );
  }
}

SectionsListItem.propTypes = {
  section: PropTypes.object.isRequired,
};

export default SectionsListItem;
