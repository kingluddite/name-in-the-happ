/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PresentationsList } from './PresentationsList';

const presentations = [
  {
    _id: 'presentationId1',
    title: 'Test title',
    body: '',
    updatedAt: 0,
    userId: 'userId1',
  },
  {
    _id: 'presentationId2',
    title: 'Test title',
    body: 'Some body content',
    updatedAt: 0,
    userId: 'userId2',
  },
];

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
