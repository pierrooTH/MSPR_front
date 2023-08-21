import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import {ArViewerView} from 'react-native-ar-viewer';

export default function ARProduct() {
  const [localModelPath, setLocalModelPath] = useState([]);

  const modelLinks = [
    'https://github.com/pierrooTH/MSPR_front/blob/react-native-ar/cafe.usdz',
  ];

  const getFileName = (url) => {
    const arr = url.split('/');
    const fileName = arr[arr.length - 1];
    return fileName;
  };

  const checkModelExisted = (url) => {
    const fileName = getFileName(url);
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    console.log('DOWNLOADING');
    RNFS.exists(localPath).then(res => {
      if (!res) {
        downloadModels(url, localPath);
      } else {
        const arr = [...localModelPath, localPath];
        const uniqueArray = [...new Set(arr)];
        setLocalModelPath([...uniqueArray]);
      }
    });
  };

  console.log(localModelPath.length);

  const downloadModels = async function(url, localPath) {
    await RNFS.downloadFile({
      fromUrl: url,
      toFile: localPath,
    }).promise;
    const arr = [...localModelPath, localPath];
    const uniqueArray = [...new Set(arr)];
    setLocalModelPath([...uniqueArray]);
  };

  useEffect(() => {
    modelLinks.forEach(link => {
      checkModelExisted(link);
    });
  }, [modelLinks.length]);

  return (
    <View style={styles.container}>
      <ArViewerView
        style={{flex: 1}}
        model={localModelPath[0]}
        lightEstimation
        manageDepth
        allowRotate
        allowScale
        allowTranslate
        disableInstantPlacement
        onStarted={() => console.log('started')}
        onEnded={() => console.log('ended')}
        onModelPlaced={() => console.log('model displayed')}
        onModelRemoved={() => console.log('model not visible anymore')}
        planeOrientation={'horizontal'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  txt: {
    color: 'white',
  },
});