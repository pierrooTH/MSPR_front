import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import ExpoTHREE, { AR } from 'expo-three';
import * as ThreeAR from 'expo-three-ar';

export default function ARProduct() {
  const renderer = useRef(null);

  useEffect(() => {
    (async () => {
      await ThreeAR.isAvailableAsync();
      AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);

      renderer.current = new ExpoTHREE.Renderer();
      renderer.current.setSize(window.innerWidth, window.innerHeight);

      AR.onFrameDidUpdate(({ camera }) => {
        renderer.current.render(AR.scene, camera);
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ExpoTHREE.View
        style={{ flex: 1 }}
        onContextCreate={async (gl) => {
          AR.scene = new THREE.Scene();
          AR.camera = ExpoTHREE.createARCamera(
            gl,
            window.innerWidth,
            window.innerHeight,
            0.01,
            1000
          );

          const modelUri = require('./3DModels/machineend.glb'); // Replace 'your_model.gltf' with your actual model file

          const model = await ExpoTHREE.loadAsync(modelUri);
          model.position.set(0, 0, -1); // Set the initial position of the model

          AR.scene.add(model);
        }}
      />
    </View>
  );
}