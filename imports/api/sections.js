import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

const SectionsCollection = new Mongo.Collection('sections');

if (Meteor.isServer) {
  Meteor.publish('sectionsPublication', function () { // eslint-disable-line func-names
    return SectionsCollection.find({ userId: this.userId });
  });
}

Meteor.methods({
  /* eslint func-names: ["error", "as-needed"] */
  'sections.insert': function () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return SectionsCollection.insert({
      name: '',
      userId: this.userId,
      updatedAt: moment().valueOf(), // new Date().getTime()
    });
  },

  'sections.remove': function (_id) {
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

    return SectionsCollection.remove({ _id, userId: this.userId });
  },

  'sections.update': function (_id, updates) {
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
    }).validate({
      _id,
      ...updates,
    });

    SectionsCollection.update(
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

export default SectionsCollection;
