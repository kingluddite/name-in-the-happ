/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// fixtures
import presentations from './../../../fixtures/fixtures';

// tested component
import { PresentationsListItem } from './PresentationsListItem';

if (Meteor.isClient) {
  describe('PresentationsListItem', function() {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy(),
      };
    });

    it('should render title and timestamp', function() {
      const wrapper = mount(
        <PresentationsListItem presentation={ presentations[0] } Session={ Session } />,
      );

      expect(wrapper.find('h5').text()).toBe(presentations[0].title);
      expect(wrapper.find('p').text()).toBe('12/31/1969');
    });

    it('should set default title if not title set', function() {
      const wrapper = mount(
        <PresentationsListItem presentation={ presentations[1] } Session={ Session } />);

      expect(wrapper.find('h5').text()).toBe('Untitled Presentation');
    });

    it('should call set on click', function() {
      // debugger;
      const wrapper = mount(
        <PresentationsListItem presentation={ presentations[0] } Session={ Session } />,
      );
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedPresentationId', presentations[0]._id);
    });
  });
}
