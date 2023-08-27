import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ProductDetails from '../components/productDetails'; // Assurez-vous que le chemin est correct
import AsyncStorage from '@react-native-community/async-storage';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('ProductDetails', () => {
  it('renders correctly with product data', () => {
    const mockRoute = {
      params: {
        name: 'Coffee Maker',
        id: 1,
        price: '10.99',
        description: 'A high-quality coffee maker.',
        stock: 5,
      },
    };

    const {getByText, getByTestId} = render(
      <ProductDetails route={mockRoute} />,
    );

    // Vérifier que les éléments sont rendus correctement
    expect(getByText('Coffee Maker')).toBeTruthy();
    expect(getByText('A high-quality coffee maker.')).toBeTruthy();
    expect(getByText('5 products in stock')).toBeTruthy();
    expect(getByText('10$')).toBeTruthy();
    expect(getByText('Product AR')).toBeTruthy();

    // Vérifier que l'image est rendue correctement
    expect(getByTestId('product-details-image')).toBeTruthy();
  });

  it('navigates to AR screen on "Product AR" button press', () => {
    const mockRoute = {
      params: {
        name: 'Coffee Maker',
        id: 1,
        price: '10.99',
        description: 'A high-quality coffee maker.',
        stock: 5,
      },
    };

    const mockNavigation = {
      navigate: jest.fn(),
    };

    const {getByText} = render(
      <ProductDetails route={mockRoute} navigation={mockNavigation} />,
    );

    // Simuler l'appui sur le bouton "Product AR"
    fireEvent.press(getByText('Product AR'));

    // Vérifier que la navigation a été appelée avec les bonnes valeurs
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AR', {
      ar: expect.any(String),
    });
  });

  it('renders correct image based on product id', () => {
    const mockRoute1 = {
      params: {
        name: 'Coffee Maker',
        id: 1,
        price: '10.99',
        description: 'A high-quality coffee maker.',
        stock: 5,
      },
    };

    const mockRoute2 = {
      params: {
        name: 'Coffee Maker',
        id: 2,
        price: '9.99',
        description: 'A low-poly coffee maker.',
        stock: 3,
      },
    };

    const mockRoute3 = {
      params: {
        name: 'Coffee Maker',
        id: 3,
        price: '12.99',
        description: 'Another coffee maker.',
        stock: 8,
      },
    };

    const {getByTestId: getByTestId1} = render(
      <ProductDetails route={mockRoute1} />,
    );
    const {getByTestId: getByTestId2} = render(
      <ProductDetails route={mockRoute2} />,
    );
    const {getByTestId: getByTestId3} = render(
      <ProductDetails route={mockRoute3} />,
    );

    // Vérifier que les images correspondent aux IDs de produits
    expect(getByTestId1('product-details-image').props.source).toEqual(
      require('../assets/coffee_maker_3.png'),
    );
    expect(getByTestId2('product-details-image').props.source).toEqual(
      require('../assets/coffee_low_poly.png'),
    );
    expect(getByTestId3('product-details-image').props.source).toEqual(
      require('../assets/coffee_maker2.png'),
    );
  });
});
