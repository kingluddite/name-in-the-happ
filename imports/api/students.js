import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

const StudentsCollection = new Mongo.Collection('students');

if (Meteor.isServer) {
  Meteor.publish('StudentsPublication', function (sectionId, presentationId) { // eslint-disable-line func-names
    return StudentsCollection.find({ userId: this.userId, sectionId, presentationId });
  });
}

Meteor.methods({
  /* eslint func-names: ["error", "as-needed"] */
  'students.insert': function (name, sectionId, presentationId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return StudentsCollection.insert({
      name,
      groupProject: false,
      currentSpeaker: false,
      notPresent: false,
      completed: false,
      sectionId,
      presentationId,
      userId: this.userId,
      updatedAt: moment().valueOf(), // new Date().getTime()
    });
  },

  'students.remove': function (_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({
      _id,
    });

    return StudentsCollection.remove({ _id, userId: this.userId });
  },

  'students.update': function (_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      title: {
        type: String,
        optional: true,
      },
      body: {
        type: String,
        optional: true,
      },
    }).validate({
      _id,
      ...updates,
    });

    StudentsCollection.update(
      {
        _id,
        userId: this.userId,
      }, {
        $set: {
          updatedAt: moment().valueOf(),
          ...updates,
        },
      });
  },

});

export default StudentsCollection;
