/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const error = 'Test Error Message';
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      const errorText = wrapper.find('p').text();

      expect(errorText).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function () {
      const email = 'test@test.com';
      const password = 'testpassword';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.node.email.value = email;
      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error').length).toNotBe(0);
    });
  });
}
