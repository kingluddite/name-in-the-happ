/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PresentationsListHeader from './PresentationsListHeader';

if (Meteor.isClient) {
  describe('PresentationsListHeader', function () {
    it('should call meteorCall on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<PresentationsListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalledWith('presentations.insert');
    });
  });
}
