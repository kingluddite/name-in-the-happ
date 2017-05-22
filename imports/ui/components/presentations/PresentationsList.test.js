/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PresentationsList } from './PresentationsList';

import presentations from './../../../fixtures/fixtures';

if (Meteor.isClient) {
  describe('PresentationsList', function () {
    it('should render PresentationsListItem for each presenation', function () {
      const wrapper = mount(<PresentationsList presentations={presentations} />);

      expect(wrapper.find('PresentationsListItem').length).toBe(2);
      expect(wrapper.find('PresentationsListEmptyItem').length).toBe(0);
    });

    it('should render PresentationsListEmptyItem if zero presentations', function () {
      const wrapper = mount(<PresentationsList presentations={[]} />);

      expect(wrapper.find('PresentationsListItem').length).toBe(0);
      expect(wrapper.find('PresentationsListEmptyItem').length).toBe(1);
    });
  });
}
