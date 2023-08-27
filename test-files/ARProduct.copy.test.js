import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import ARProduct from '../components/ARProduct'; // Assurez-vous que le chemin est correct

describe('ARProduct', () => {
  test('renders AR Viewer with the correct model', async () => {
    const mockRoute = {
      params: {
        ar: 'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-3.usdz',
      },
    };

    const {getByTestId} = render(<ARProduct route={mockRoute} />);

    // Attendre un délai après le chargement simulé du modèle
    await waitFor(() => {
      const arViewer = getByTestId('ar-viewer');
      expect(arViewer).toBeTruthy();
    });
  });
});
