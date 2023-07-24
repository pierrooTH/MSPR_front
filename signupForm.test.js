import React from 'react';
import renderer from 'react-test-renderer';

import SignupForm from './signupForm';

describe('<SignupForm />', () => {
  it('has 1 child', () => {
    const component = renderer.create(<SignupForm />);
    const tree = component.toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('input fields are empty by default', () => {
    const component = renderer.create(<SignupForm />);
    const usernameInput = component.root.findByProps({ name: 'firstname' });
    const emailInput = component.root.findByProps({ name: 'lastname' });
    const passwordInput = component.root.findByProps({ name: 'mail' });

    expect(usernameInput.props.value).toBe('');
    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
  });
});

