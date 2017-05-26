/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// fixtures
import presentations from './../../../../fixtures/fixtures';

// tested component
import { NewPresentation } from './../NewPresentation';

if (Meteor.isClient) {
  describe('NewPresentation', function () {
    let meteorCall;
    let Session;

    beforeEach(() => {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy(),
      };
    });

    it('should call meteorCall on click', function () {
      const wrapper = mount(<NewPresentation meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, presentations[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('presentations.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedPresentationId', presentations[0]._id);
    });

    it('should not set session for failed insert', function () {
      const wrapper = mount(<NewPresentation meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('presentations.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}
