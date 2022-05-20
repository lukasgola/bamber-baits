import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null)

  const addPhoto = navigation.state.params.newPhoto

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const snap = async () => {
    if(cameraRef){
        let photo = await cameraRef.takePictureAsync('photo');
        navigation.navigate('ImageScreen', {photo, addPhoto})
    }
  };

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        ref={ref => {
            setCameraRef(ref);
            }}
    >
        <TouchableOpacity
            style={styles.button}
            onPress={() => snap()}
        >
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    width: 50, 
    height: 50,
    borderRadius: 25, 
    backgroundColor: 'white', 
    position: 'absolute',
    bottom: 50
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
