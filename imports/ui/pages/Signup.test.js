/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', function () {
    it('should show error messages', function () {
      const error = 'Test Error Message';
      const wrapper = mount(<Signup loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      const errorText = wrapper.find('p').text();

      expect(errorText).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function () {
      const email = 'test@test.com';
      const password = 'testpassword';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.node.email.value = email;
      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', function () {
      const email = 'test@test.com';
      const password = 'shortpwd             ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.node.email.value = email;
      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      // Expect error state to have length greater than zero
      expect(wrapper.state('error').length).toNotBe(0);
    });

    it('should set createUser callback errors', function () {
      const password = 'validlengthpassword';
      const reason = 'This is why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}
