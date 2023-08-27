import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SignupForm from '../signupForm'; // Assurez-vous d'importer le chemin correct

describe('<SignupForm />', () => {
  it('displays input fields and submit button', () => {
    const {getByTestId} = render(<SignupForm />);
    const firstnameInput = getByTestId('firstname-input');
    const lastnameInput = getByTestId('lastname-input');
    const emailInput = getByTestId('mail-input');
    const submitButton = getByTestId('submit-button');

    expect(firstnameInput).toBeTruthy();
    expect(lastnameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('displays error message when submitting without filling all fields', async () => {
    const {getByTestId} = render(<SignupForm />);
    const submitButton = getByTestId('submit-button');

    fireEvent.press(submitButton);

    const errorMessage = await waitFor(() => getByTestId('error-message'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.props.children).toBe(
      'Veuillez remplir tous les champs.',
    );
  });

  it('navigates to QrCode screen on successful submission', async () => {
    const {getByTestId} = render(
      <SignupForm navigation={{navigate: jest.fn()}} />,
    );
    const firstnameInput = getByTestId('firstname-input');
    const lastnameInput = getByTestId('lastname-input');
    const emailInput = getByTestId('mail-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(firstnameInput, 'John');
    fireEvent.changeText(lastnameInput, 'Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(firstnameInput.props.value).toBe('John');
      expect(lastnameInput.props.value).toBe('Doe');
      expect(emailInput.props.value).toBe('john.doe@example.com');
    });
  });

  it('displays error message on unsuccessful submission', async () => {
    const {getByTestId} = render(
      <SignupForm navigation={{navigate: jest.fn()}} />,
    );
    const firstnameInput = getByTestId('firstname-input');
    const lastnameInput = getByTestId('lastname-input');
    const emailInput = getByTestId('mail-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(firstnameInput, 'John');
    fireEvent.changeText(lastnameInput, 'Doe');
    fireEvent.changeText(emailInput, '');

    fireEvent.press(submitButton);

    const errorMessage = await waitFor(() => getByTestId('error-message'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.props.children).toBe(
      'Veuillez remplir tous les champs.',
    );
  });
});
