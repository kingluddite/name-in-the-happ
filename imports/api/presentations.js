import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PresentationsCollection = new Mongo.Collection('presentations');

if (Meteor.isServer) {
  Meteor.publish('presentationsPub', function () { // eslint-disable-line func-names
    return PresentationsCollection.find({ userId: this.userId });
  });
}

Meteor.methods({
  'presentations.insert': function (name, sectionId) { // eslint-disable-line func-names
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      name: {
        type: String,
        min: 5,
      },
      sectionId: {
        type: String,
      },
    }).validate({
      name,
      sectionId,
    });

    PresentationsCollection.insert({
      name,
      sectionId,
      userId: this.userId,
    });
  },
  'presentations.remove': function (_id) { // eslint-disable-line func-names
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 17,
      },
    }).validate({
      _id,
    });
    PresentationsCollection.remove({ _id });
  },
});


export default PresentationsCollection;
