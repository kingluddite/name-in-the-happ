/* eslint-disable */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import PresentationsCollection from './presentations';

if (Meteor.isServer) {
  describe('presentations', function() {

    const presentationOne = {
      _id: 'testPresentationId1',
      title: 'My Test Title',
      body: 'My Test Body',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    beforeEach(function() {
      PresentationsCollection.remove({});
      PresentationsCollection.insert(presentationOne);
    });

    it('should insert new presentation', function() {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['presentations.insert'].apply({
        userId
      });

      expect(PresentationsCollection.findOne({ _id, userId })).toExist();
    });

    it('should not insert presentation if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['presentations.insert']();
      }).toThrow();
    });

    it('should remove presenation', function() {
      Meteor.server.method_handlers['presentations.remove'].apply({ userId: presentationOne.userId }, [presentationOne._id]);
        expect(PresentationsCollection.findOne({ _id: presentationOne._id })).toNotExist();
      });
    });

    it('should not remove presentation if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handler['presentations.remove'].apply({}, [presentationOne._id]).toThrow();
      });
    });

    it('should not remove note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: presentationOne.userId }).toThrow();
      });
    });
};
