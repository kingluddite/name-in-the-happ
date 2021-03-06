import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

const StudentsCollection = new Mongo.Collection('students');

if (Meteor.isServer) {
  Meteor.publish('studentsPublication', function (sectionId, presentationId) { // eslint-disable-line func-names
    const userId = this.userId;
    // return StudentsCollection.find({ userId: this.userId, sectionId, presentationId });
    const allStudentWithSectionPres = StudentsCollection.find({ userId, sectionId, presentationId }); // eslint-disable-line max-len

    if (allStudentWithSectionPres) {
      return allStudentWithSectionPres;
    }

    return this.ready();
  });
}

Meteor.methods({
  /* eslint func-names: ["error", "as-needed"] */
  'students.insert': function (name, sectionId, presentationId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      name: {
        type: String,
      },
      currentSpeaker: {
        type: Boolean,
        defaultValue: false,
        optional: true,
      },
      notPresent: {
        type: Boolean,
        defaultValue: false,
        optional: true,
      },
      completed: {
        type: Boolean,
        defaultValue: false,
        optional: true,
      },
      onDeck: {
        type: Boolean,
        defaultValue: false,
        optional: true,
      },
      groupProject: {
        type: Boolean,
        defaultValue: false,
        optional: true,
      },
    }).validate({
      name,
    });

    return StudentsCollection.insert({
      name,
      sectionId,
      presentationId,
      currentSpeaker: false,
      notPresent: false,
      completed: false,
      onDeck: false,
      groupProject: false,
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
      name: {
        type: String,
        optional: true,
      },
      title: {
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
