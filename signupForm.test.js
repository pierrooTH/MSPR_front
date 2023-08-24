import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignupForm from './signupForm';
import axios from 'axios';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';

// Mock axios.post pour simuler une requête réussie
jest.mock('axios');

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

  it('navigates to QrCode page when all fields are filled and submit button is pressed width good data', async () => {
    const navigate = jest.fn(); // Créez une fonction de contournement pour la navigation
    const {getByTestId} = render(<SignupForm navigation={{navigate}} />);

    const submitButton = getByTestId('submit-button');
    const firstNameInput = getByTestId('firstname-input');
    const lastNameInput = getByTestId('lastname-input');
    const emailInput = getByTestId('mail-input');

    // Remplir les champs
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');

    // Simuler la requête API réussie
    axios.post.mockResolvedValue({status: 201});

    fireEvent.press(submitButton);

    await expect(axios.post).toHaveBeenCalledWith(
      'http://192.168.1.15:4000/users',
      {
        email: 'john.doe@example.com',
        firstname: 'John',
        lastname: 'Doe',
      },
    );
    expect(navigate).toHaveBeenCalledWith('QrCode', {
      email: 'john.doe@example.com',
    });
  });
});
