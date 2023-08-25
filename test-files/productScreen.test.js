import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import ProductScreen from '../productScreen'; // Assurez-vous que le chemin d'importation est correct

jest.mock('axios'); // Mock axios pour simuler les requêtes

describe('<ProductScreen />', () => {
  it('displays loading message when dataProduct is empty', () => {
    const {getByText} = render(<ProductScreen route={{params: {}}} />);
    const loadingMessage = getByText('Chargement...');

    expect(loadingMessage).toBeTruthy();
  });

  it('displays product data when dataProduct is not empty', async () => {
    const responseData = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        stock: 10,
        price: '20.99',
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        stock: 5,
        price: '15.99',
      },
    ];
    axios.get.mockResolvedValueOnce({status: 200, data: responseData});

    const {getByTestId, getByText} = render(
      <ProductScreen route={{params: {}}} />,
    );

    await waitFor(() => {
      responseData.forEach(product => {
        const productNameText = getByText(product.name);
        expect(productNameText).toBeTruthy();
      });
    });

    const productScreen = getByTestId('product-screen');
    expect(productScreen).toBeTruthy();
  });
});
