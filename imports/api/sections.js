import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const SectionsCollection = new Mongo.Collection('sections');

if (Meteor.isServer) {
  Meteor.publish('sectionsPub', function () { // eslint-disable-line func-names
    return SectionsCollection.find({ userId: this.userId });
  });
}

Meteor.methods({
  'sections.insert': function (name, code) { // eslint-disable-line func-names
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      name: {
        type: String,
        min: 5,
      },
      code: {
        type: String,
        min: 3,
      },
    }).validate({
      name, code,
    });

    SectionsCollection.insert({
      name,
      code,
      userId: this.userId,
    });
  },
  'sections.remove': function (_id) { // eslint-disable-line func-names
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
    SectionsCollection.remove({ _id });
  },
});


export default SectionsCollection;
