// import React, { Component } from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
// import { Session } from 'meteor/session';
// import PropTypes from 'prop-types';
//
// // collections
// import SectionsCollection from './../../../api/Sections';
//
// export class ViewSection extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       title: '',
//       body: '',
//     };
//   }
//
//   render() {
//     if (this.props.section) {
//       return (
//         <div className="editor">
//          <h1>Section Title</h1>
//          <p>Names in Section</p>
//        </div>
//       );
//     }
//     return (
//       <div className="editor">
//         <p className="editor__message">
//           { this.props.selectedSectionId ? 'Section not found.' : 'Pick or create a section to get started.'}
//         </p>
//       </div>
//     );
//   }
// }
//
// ViewSection.propTypes = {
//   selectedSectionId: PropTypes.string,
//   section: PropTypes.object,
// };
//
// export default createContainer(() => {
//   const selectedSectionId = Session.get('selectedSectionId');
//
//   return {
//     selectedSectionId,
//     section: SectionsCollection.findOne(selectedSectionId),
//   };
// }, ViewSection);
