import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faArrowLeft,
    faTrashAlt,
    faPlus
 } from '@fortawesome/free-solid-svg-icons'

export default function Photos(props) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [modalVisible, setModalVisible] = useState(false);

    const [currentPhoto, setCurrentPhoto] = useState({id: null, photo: {width: null, height: null, uri: null}})

    const [photos, setPhotos] = useState(props.item.photos)

    const [recipies, setRecipies] = useState(props.recipies)


    const newPhoto = async (value) => {
    
        const newPhoto = {
          id: photos.length == 0 ? 1 : photos[photos.length-1].id+1,
          photo: value
        }
        photos.push(newPhoto)
    
        const filtered = photos.filter( item => item.id == item.id)
        setPhotos(filtered)
        recipies.map( item => {
          if(item.id == props.item.id){
            item.photos = photos
          }
        })
        storeData(recipies)
    }
    
    const deletePhoto = async (id) => {
      const filtered = photos.filter( item => item.id != id )
      setPhotos(filtered)
    
      recipies.map( item => {
        if(item.id == props.item.id){
          item.photos = filtered
        }
      })
      storeData(recipies)
    }


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Recipies', JSON.stringify(value))
    } catch (error) {

    }
  }

  const EmptyListMessage = () => {
    return(
        <View style={{height: windowHeight*0.4, justifyContent: 'center', alignItems: 'center', marginTop: 55}}>
            <Text style={{color: '#BBB'}}>Nie masz żadnych zdjęć</Text>
    </View>
    )
};

    
  return (
    <View style={styles.container}>
        <FlatList
            data={photos}
            renderItem={({ item }) =>(
                <TouchableOpacity 
                    onPress={() => [setCurrentPhoto(item), setModalVisible(true)]}
                    style={{marginBottom: 10, borderRadius: 5}}
                >
                    <Image source={{ uri: item.photo.uri }} 
                        style={{
                        width: windowWidth*0.4, 
                        height: windowWidth*0.4, 
                        borderRadius: 5,
                        }}
                    />
                    <TouchableOpacity 
                        onPress={() => deletePhoto(item.id)}
                        style={{width: 30, height: 30, borderRadius: 15, position: 'absolute', top: 5, right: 5, zIndex: 101, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesomeIcon 
                            icon={ faTrashAlt } 
                            size={15}
                            style={{
                            color: '#d73a3a',
                            }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
                )}
            keyExtractor={item => item.id.toString()}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            ListEmptyComponent={EmptyListMessage}
        />
        <TouchableOpacity
            onPress={() => props.navigation.navigate('Camera', {newPhoto})}
            style={[styles.kilosButt, {bottom: 20}]}
        >
            <FontAwesomeIcon 
                icon={ faPlus } 
                size={15}
                style={{
                color: '#FFF',
                }}
            />
        </TouchableOpacity>

        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            modalVisible(!modalVisible);
            }}
        >
            <View style={{
                flex: 1,
                backgroundColor: '#241f36',
                paddingHorizontal: '5%',
                paddingTop: Platform.OS === 'ios' ? '10%' : '0%'
            }}>
                <View style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                        <TouchableOpacity 
                            onPress={() => [setModalVisible(!modalVisible)]}>
                            <FontAwesomeIcon 
                                icon={ faArrowLeft } 
                                size={30}
                                style={{
                                color: '#FFF'
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => [deletePhoto(currentPhoto.id),setModalVisible(!modalVisible)]}
                        >
                            <FontAwesomeIcon 
                                icon={ faTrashAlt } 
                                size={30}
                                style={{
                                color: '#d73a3a',
                                }}
                            />
                        </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: '5%' }}>
                    <Image 
                        resizeMode={'contain'}
                        source={{ uri: currentPhoto.photo.uri }} 
                        style={{width: '100%', height: '100%', borderRadius: 10}}
                    />
                </View>
                
            </View>
                
        </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#241f36',
        paddingHorizontal: '5%',
        paddingTop: '5%'
    },
    kilosButt: {
        position: 'absolute',
        zIndex: 100,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#28a745',
        bottom: 20,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
