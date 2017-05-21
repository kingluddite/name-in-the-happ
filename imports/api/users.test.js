/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import validateNewUser from './users';

if (Meteor.isServer) {
  describe('users', function () {
    it('should allow valid email address', function () {
      // user.emails[0].address
      const testUser = {
        emails: [
          {
            address: 'test@example.com',
          },
        ],
      };

      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should reject invalid email', function () {
      const testUser = {
        emails: [
          {
            address: 'meyou.com',
          },
        ],
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}
