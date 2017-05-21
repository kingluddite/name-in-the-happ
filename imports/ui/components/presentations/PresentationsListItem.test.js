/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PresentationsListItem from './PresentationsListItem';

if (Meteor.isClient) {
  describe('PresentationsListItem', function () {
    it('should render title and timestamp', function () {
      const title = 'My Test Title';
      const updatedAt = 1495401391541;
      const wrapper = mount(<PresentationsListItem presentation={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('5/21/2017');
    });

    it('should set default title if not title set', function () {
      const title = '';
      const updatedAt = 1495401391541;
      const wrapper = mount(<PresentationsListItem presentation={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe('Untitled Presentation');
    });
  });
}
