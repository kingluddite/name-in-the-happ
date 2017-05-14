import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

class PresentationsListItem extends Component {
  handleClickDelete() {
    Meteor.call('presentations.remove', this.props.presentation._id);
  }

  handleClickItem() {
    const id = this.props.presentation._id;
    browserHistory.push(`/presentations/${id}`);
  }
  render() {
    return (
      <div className="item">
       <div className="presentations">
         <div onClick={this.handleClickItem.bind(this)}>
           <h2 className="item__name">{this.props.presentation.name}</h2>
         </div>
       <div className="presentations__actions">
         <button className="button button--edit button--round">
           <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
         </button>
         <button
           className="button button--delete button--round"
           onClick={this.handleClickDelete.bind(this)}>
           <i className="fa fa-trash" aria-hidden="true"></i>
         </button>
         </div>
         {/* END .presentations__actions */}
       </div>
       {/* END .presentations */}
     </div>
    //  END .item
    );
  }
}

PresentationsListItem.propTypes = {
  presentation: PropTypes.object.isRequired,
};

export default PresentationsListItem;
