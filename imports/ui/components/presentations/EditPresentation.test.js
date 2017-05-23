/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { EditPresentation } from './EditPresentation';
import presentations from './../../../fixtures/fixtures';

if (Meteor.isClient) {
  describe('EditPresentation', function () {
    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy(),
      };
    });

    it('should render pick presentation message', function () {
      const wrapper = mount(<EditPresentation browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick or create a presentation to get started.');
    });

    it('should render presentation found message', function () {
      const wrapper = mount(
        <EditPresentation
          selectedPresentationId={presentations[0]._id} browserHistory={browserHistory}
          call={call}
        />,
      );
      expect(wrapper.find('p').text()).toBe('Presentation not found.');
    });

    it('should remove a presentation', function () {
      const wrapper = mount(
        <EditPresentation
          presentation={presentations[0]}
          selectedPresentationId={presentations[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);

      wrapper.find('button').simulate('click');

      expect(browserHistory.push).toHaveBeenCalledWith('/presentations');
      expect(call).toHaveBeenCalledWith('presentations.remove', presentations[0]._id);
    });

    it('should update the presentation body on textarea change', function () {
      const newBody = 'This is new body test text';
      const wrapper = mount(
        <EditPresentation
          presentation={presentations[0]}
          selectedPresentationId={presentations[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody,
        },
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('presentations.update', presentations[0]._id, { body: newBody });
    });

    it('should update the presentation title on input change', function () {
      const newTitle = 'This is new title test text';
      const wrapper = mount(
        <EditPresentation
          presentation={presentations[0]}
          selectedPresentationId={presentations[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle,
        },
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('presentations.update', presentations[0]._id, { title: newTitle });
    });

    it('should set state for new presenation', function () {
      const wrapper = mount(
        <EditPresentation
          browserHistory={browserHistory}
          call={call}
        />,
      );
      wrapper.setProps({
        selectedPresentationId: presentations[0]._id,
        presentation: presentations[0],
      });

      expect(wrapper.state('title')).toBe(presentations[0].title);
      expect(wrapper.state('body')).toBe(presentations[0].body);
    });

    it('should not set state if presenation prop not provided', function () {
      const wrapper = mount(<EditPresentation browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedPresentationId: presentations[0]._id,
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });
  });
}
