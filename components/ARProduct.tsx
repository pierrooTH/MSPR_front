import * as React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import RNFS from 'react-native-fs';

export default function App() {
  const [localModelPath, setLocalModelPath] = React.useState<string | undefined>();
  const [showArView] = React.useState(true);
  const ref = React.useRef<ArViewerView>(null);

  const loadPath = async () => {
    const modelSrc =
      Platform.OS === 'android'
        ? 'https://github.com/riderodd/react-native-ar/blob/main/example/src/dice.glb?raw=true'
        : 'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels/Coffee_maker.usdz';
    const modelPath = `${RNFS.DocumentDirectoryPath}/${getFileName(modelSrc)}.${
      Platform.OS === 'android' ? 'glb' : 'usdz'
    }`;
    const exists = await RNFS.exists(modelPath);
    console.log(modelPath);
    if (!exists) {
      await RNFS.downloadFile({
        fromUrl: modelSrc,
        toFile: modelPath,
      }).promise;
    }

    setLocalModelPath(modelPath);
  };

  React.useEffect(() => {
    loadPath();
  }, []);

  const getFileName = (url: any) => {
    const arr = url.split('/');
    const fileName = arr[arr.length - 1];
    return fileName;
  };

  return (
    <View style={styles.container}>
      {localModelPath && showArView && (
        <ArViewerView
          model={localModelPath}
          style={styles.arView}
          disableInstantPlacement
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          onStarted={() => console.log('started')}
          onEnded={() => console.log('ended')}
          onModelPlaced={() => console.log('model displayed')}
          onModelRemoved={() => console.log('model not visible anymore')}
          ref={ref}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  arView: {
    flex: 1,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
