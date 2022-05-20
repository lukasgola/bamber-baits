import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faArrowLeft,
    faCheckCircle,
    faTrashAlt,
    faPlus
 } from '@fortawesome/free-solid-svg-icons'


export default function Notes(props) {

    const windowHeight = Dimensions.get('window').height;

    const [modalVisible, setModalVisible] = useState(false);

    const [notes, setNotes] = useState(props.item.notes)
    const [singleNote, setSingleNote] = useState('')

    const [noteId, setNoteId] = useState()

    const [variant, setVariant] = useState()

    const [recipies, setRecipies] = useState(props.recipies)


    const newNote = async (value) => {
    
    const newNote = {
      id: notes.length == 0 ? 1 : notes[notes.length-1].id+1,
      note: value
    }
    notes.push(newNote)
    recipies.map( item => {
        if(item.id == props.item.id){
            item.notes = notes
        }
    })
    
    storeData(recipies)
    setSingleNote('')
}

  const updateNote = async (id, note) => {
    
    notes.map( item => {
        if(item.id == id){
            item.note = note
        }
    })
    recipies.map( item => {
        if(item.id == props.item.id){
            item.notes = notes
        }
    })
    
    storeData(recipies)
    setSingleNote('')

  }

  const deleteNotes = async (id) => {
    const filtered = notes.filter( item => item.id != id )
    setNotes(filtered)

    recipies.map( item => {
      if(item.id == props.item.id){
        item.notes = filtered
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

  const Item = ({item}) => (
    <TouchableOpacity
        style={{backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 5, width: '90%', marginLeft: '5%', marginTop: 20, padding: 20}}
        onPress={() => [setModalVisible(true), setNoteId(item.id), setSingleNote(item.note), setVariant(1)]}
    >
        <Text style={{color: 'white'}}>{item.note}</Text>
        <TouchableOpacity 
            onPress={() => deleteNotes(item.id)}
            style={{width: 35, height: 35, borderRadius: 20, position: 'absolute', top: -5,  right: -5, zIndex: 101, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesomeIcon 
                icon={ faTrashAlt } 
                size={15}
                style={{
                color: '#d73a3a',
                }}
            />
        </TouchableOpacity>
    </TouchableOpacity>
  )


  const EmptyListMessage = () => {
    return(
        <View style={{height: windowHeight*0.4, justifyContent: 'center', alignItems: 'center', marginTop: 75}}>
            <Text style={{color: '#BBB'}}>Nie masz żadnych notatek</Text>
    </View>
    )
};

      
  
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={[styles.kilosButt, {bottom: 20, backgroundColor: '#d73a3a'}]}
            onPress={() => [setModalVisible(true), setVariant(0)]}
        >
            <FontAwesomeIcon 
                icon={ faPlus } 
                size={15}
                style={{
                color: '#FFF',
                }}
            />
        </TouchableOpacity>
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList
                data={notes}
                renderItem={Item}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyListMessage}
            />
        </View>
        
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
                paddingTop: Platform.OS === 'ios' ? '10%' : '0%',
            }}>
                <View style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                        <TouchableOpacity 
                            onPress={() => [setModalVisible(!modalVisible), setSingleNote('')]}>
                            <FontAwesomeIcon 
                                icon={ faArrowLeft } 
                                size={30}
                                style={{
                                color: '#FFF'
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => [setModalVisible(!modalVisible), variant == 0 ? newNote(singleNote) : updateNote(noteId, singleNote)]}
                        >
                            <FontAwesomeIcon 
                                icon={ faCheckCircle } 
                                size={30}
                                style={{
                                color: '#28a745',
                                }}
                            />
                        </TouchableOpacity>
                </View>
                <View style={{
                    width: '100%',
                    height: windowHeight/2,
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <TextInput 
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0,0,0,0.25)',
                          borderRadius: 10,
                          padding: 20,
                          paddingTop: 20,
                          textAlignVertical: 'top'
                        }}
                        color={'#FFF'}
                        placeholder={'Nowa notatka'}
                        placeholderTextColor={'#AAA'}
                        value={singleNote}
                        onChangeText={setSingleNote}
                        multiline
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
      },
    flatlist: {
        width: '100%'
    },
    text: {
        fontSize: 14,
        color: '#fff',
    },
    text_bold:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    icon: {
        height: 40,
        width: 40,
        tintColor: '#f08773',
    },
    textInput:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    kilosButt: {
        position: 'absolute',
        zIndex: 100,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#28a745',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
