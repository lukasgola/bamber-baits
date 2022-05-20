import * as React from 'react';
import { View ,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faArrowLeft,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

import Constants from 'expo-constants';

export default function notification({ navigation }) {

    const  photo  = navigation.state.params.photo

    const save = () => {
        navigation.state.params.addPhoto(photo)
        navigation.navigate('Recipe')
    }

    const notSave = () => {
        navigation.navigate('Recipe')
    }

    return (
        <View style={{flex: 1, backgroundColor: '#241f36'}}>
            <StatusBar style="light" />
            <View style={{
                flex: 1,
                backgroundColor: '#241f36',
                paddingHorizontal: '5%',
                marginTop: Constants.statusBarHeight,
            }}>
                <View style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                        <TouchableOpacity 
                            onPress={() => notSave()}>
                            <FontAwesomeIcon 
                                icon={ faArrowLeft } 
                                size={30}
                                style={{
                                color: '#FFF'
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => save()}
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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: '5%' }}>
                    <Image 
                        resizeMode={'contain'}
                        source={{ uri: photo.uri }} 
                        style={{width: '100%', height: '100%', borderRadius: 10}}
                    />
                </View>
                
            </View>
        </View>
        
    );
}