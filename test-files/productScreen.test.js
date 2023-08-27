import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import ProductScreen from '../productScreen';
import AsyncStorage from '@react-native-community/async-storage';
import MockAdapter from 'axios-mock-adapter';

beforeEach(async () => {
  await AsyncStorage.clear();
});
jest.mock('axios'); // Mock axios pour simuler les requêtes

describe('<ProductScreen />', () => {
  it('displays loading message when no dataProduct', () => {
    const {getByText} = render(<ProductScreen />);
    const loadingText = getByText('Chargement...');
    expect(loadingText).toBeTruthy();
  });

  it('displays product data when dataProduct is not empty', async () => {
    const mockDataProduct = [
      {
        name: 'Product 1',
        product_detail: {
          id: 1,
          description: 'Description 1',
          price: '20.99',
        },
        stock: 10,
      },
      {
        name: 'Product 2',
        product_detail: {
          id: 2,
          description: 'Description 2',
          price: '15.99',
        },
        stock: 5,
      },
    ];

    const mock = new MockAdapter(axios);
    mock.onGet('http://192.168.1.14:4000/products').reply(200, mockDataProduct);

    const {findByTestId} = render(<ProductScreen />);

    await waitFor(() => {
      mockDataProduct.forEach(async product => {
        const productNameText = await findByTestId(
          `product-name-${product.product_detail.id}`,
        );
        expect(productNameText).toBeTruthy();
        expect(productNameText.props.children).toBe(product.name);
      });
    });
  });
});
