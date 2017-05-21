/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import PresentationsCollection from './presentations';

if (Meteor.isServer) {
  describe('presentations', function () {
    const presentationOne = {
      _id: 'testPresentationId1',
      title: 'Test Title 1',
      body: 'Test Body 1',
      updatedAt: 0,
      userId: 'testUserId1',
    };

    const presentationTwo = {
      _id: 'testPresentationId2',
      title: 'Test Title 2',
      body: 'Test Body 2',
      updatedAt: 0,
      userId: 'testUserId2',
    };

    beforeEach(function () {
      PresentationsCollection.remove({});
      PresentationsCollection.insert(presentationOne);
      PresentationsCollection.insert(presentationTwo);
    });

    it('should insert new presentation', function () {
      const userId = 'loggedInByNotCreatorId';
      const _id = Meteor.server.method_handlers['presentations.insert'].apply({
        userId,
      });

      expect(PresentationsCollection.findOne({ _id, userId })).toExist();
    });

    it('should not insert presentation if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['presentations.insert']();
      }).toThrow();
    });

    it('should remove presentation', function () {
      Meteor.server.method_handlers['presentations.remove'].apply({ userId: presentationOne.userId }, [presentationOne._id]);
      expect(PresentationsCollection.findOne({ _id: presentationOne._id })).toNotExist();
    });

    it('should not remove presentation if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handler['presentations.remove'].apply({}, [presentationOne._id]).toThrow();
      });
    });

    it('should not remove note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['presentations.remove'].apply({ userId: presentationOne.userId }).toThrow();
      });
    });

    it('should update presenation', function () {
      const title = 'Updated Test Title';
      Meteor.server.method_handlers['presentations.update'].apply({
        userId: presentationOne.userId,
      }, [
        presentationOne._id,
        { title },
      ]);

      const presentation = PresentationsCollection.findOne(presentationOne._id);

      expect(presentation.updatedAt).toBeGreaterThan(0);
      expect(presentation).toInclude({
        title,
        body: presentationOne.body,
      });
    });

    it('should throw error if extra updates provided', function () {
      const title = 'Updated Test Title';
      expect(() => {
        Meteor.server.method_handlers['presenations.update'].apply({
          userId: presentationOne.userId,
        }, [
          presentationOne._id,
          { title, name: 'Bad Data' },
        ]);
      }).toThrow();
    });

    it('should not update presentation if user was not creator', function () {
      const title = 'Updated Test Title';

      Meteor.server.method_handlers['presentations.update'].apply({
        userId: 'testId',
      }, [
        presentationOne._id,
        { title },
      ]);

      const presentation = PresentationsCollection.findOne(presentationOne._id);

      expect(presentation).toInclude(presentationOne);
    });

    it('should not update presentation if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['presentations.update']();
      }).toThrow();
    });

    it('should not update note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['presentations.update'].apply({ userId: presentationOne.userId }).toThrow();
      });
    });

    it('should return a users presentations', function () {
      const res = Meteor.server.publish_handlers.presentationsPublication.apply(
        { userId: presentationOne.userId },
      );
      const presentations = res.fetch();

      expect(presentations.length).toBe(1);
      expect(presentations[0]).toEqual(presentationOne);
    });

    it('should return zero presentations for user that has none', function () {
      const res = Meteor.server.publish_handlers.presentationsPublication.apply(
        { userId: 'userWithNoPresenationsId' },
      );
      const presentations = res.fetch();

      expect(presentations.length).toBe(0);
    });
  });
}
