import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignupForm from './signupForm';

describe('<SignupForm />', () => {
  it('has 1 child', () => {
    const {toJSON} = render(<SignupForm />);
    const tree = toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('input fields are empty by default', () => {
    const {getByTestId} = render(<SignupForm />);
    const usernameInput = getByTestId('firstname-input');
    const emailInput = getByTestId('lastname-input');
    const passwordInput = getByTestId('mail-input');

    expect(usernameInput.props.value).toBe('');
    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
  });

  it('cannot submit the form if all fields are not filled', () => {
    const {getByTestId} = render(<SignupForm />);
    const submitButton = getByTestId('submit-button'); // Récupère le bouton par son testID

    fireEvent.press(submitButton);

    const errorMessage = getByTestId('error-message');
    expect(errorMessage.props.children).toBe(
      'Veuillez remplir tous les champs.',
    );
  });
});
