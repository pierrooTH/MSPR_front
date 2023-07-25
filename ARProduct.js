import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { resolveAsync } from 'expo-asset-utils';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { Renderer, TextureLoader, loadObjAsync, loadTextureAsync } from 'expo-three';
import OrbitControlsView from 'expo-three-orbit-controls';
import { Asset } from 'expo-asset'
import {
  AmbientLight,
  BoxGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Camera,
} from 'three';

const ARProduct = () => {
  const [camera, setCamera] = useState(null);

  let timeout;

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 5, 5);
    setCamera(camera);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const ambientLight = new AmbientLight(0xB1B1B1, 1.5);
    scene.add(ambientLight);

    const spotLight = new SpotLight(0xffffff, 1.5);
    spotLight.position.set(0, 200, 200);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    // const texture = await loadTextureAsync({
    //   asset: require('./assets/machineend.mtl'),
    // });

    // const obj = await loadObjAsync({
    //   asset: require('./assets/machineend.obj')
    // });
    obj.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.material.map = texture;
      }
    });

    scene.add(obj);

    camera.lookAt(obj.position);

    function update() {
      obj.rotation.y = 0;
      obj.rotation.x = 0;
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);

      gl.endFrameEXP();
    };
    render();
  };

  return (
    <View style={{flex: 1}}>
      <OrbitControlsView style={{ flex: 1 }} camera={camera}>
        <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} key="d" />
      </OrbitControlsView>
    </View>

  );
};

export default ARProduct;