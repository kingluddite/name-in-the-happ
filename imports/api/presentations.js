import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

const PresentationsCollection = new Mongo.Collection('presentations');

Meteor.methods({
  /* eslint func-names: ["error", "as-needed"] */
  'presentations.insert': function () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return PresentationsCollection.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf(), // new Date().getTime()
    });
  },

  'presentations.remove': function (_id) {
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

    return PresentationsCollection.remove({ _id, userId: this.userId });
  },

  'notes.update': function (_id, updates) {
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

    PresentationsCollection.update(_id, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates,
      },
    });
  },

});

export default PresentationsCollection;
