import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image, TextInput, Modal, Dimensions, Animated } from 'react-native';

import Slider from '@react-native-community/slider';

import styles from '../styles/global'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage'


export default function ItemSettings({navigation}) {

    const screen = navigation.state.params.screen
    const currentItem = navigation.state.params.currentItem

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const setList = navigation.state.params.setList
    const type = navigation.state.params.type

    const [color, setColor] = useState(navigation.state.params.color)


    const [sliderValue, setSliderValue] = useState(navigation.state.params.sliderValue)
    const [sliderValue2, setSliderValue2] = useState(navigation.state.params.sliderValue)

    const [proteinValue, setProteinValue] = useState(navigation.state.params.proteinValue)
    const [proteinPrev, setProteinPrev] = useState(navigation.state.params.proteinValue)
    const [carbValue, setCarbValue] = useState(navigation.state.params.carbValue)
    const [carbPrev, setCarbPrev] = useState(navigation.state.params.carbValue)
    const [fatValue, setFatValue] = useState(navigation.state.params.fatValue)
    const [fatPrev, setFatPrev] = useState(navigation.state.params.fatValue)
    const [gramsValue, setGramsValue] = useState(navigation.state.params.gramsValue)
    const [gramsPrev, setGramsPrev] = useState(navigation.state.params.gramsValue)

    const [maxGrams, setMaxGrams] = useState(navigation.state.params.gramsValue - navigation.state.params.currentItem.grams)


    const updateSlider = (value) => {
        setSliderValue(value)
        setProteinPrev(proteinValue + value*currentItem.protein*0.01 - currentItem.grams*currentItem.protein*0.01)
        setCarbPrev(carbValue + value*currentItem.carb*0.01 - currentItem.grams*currentItem.carb*0.01)
        setFatPrev(fatValue + value*currentItem.fat*0.01 - currentItem.grams*currentItem.fat*0.01)
        setGramsPrev(gramsValue - currentItem.grams + value)  
    }

    const notUpdateSlider = () => {
        navigation.goBack();
    }

    const updateMakro = () => {
        navigation.state.params.updateMakro(currentItem, proteinPrev, carbPrev, fatPrev, gramsPrev, sliderValue);
        navigation.goBack();
    }

    const deleteItem = (item) => {
        navigation.state.params.deleteItem(item);
        navigation.goBack();
    }


    const storeFav = async (arr) => {
        try {
            await AsyncStorage.setItem('@storage_Fav', JSON.stringify(arr))
        } catch (error) {

        }
    }

    const addFav = (c_item) => {
        let test2 = true;
        navigation.state.params.fav.map( item1 => {
            if(item1.id == c_item.id){
                test2 = false
            }
        })
        
        if(test2){
            setColor('#d73a3a')
            const arr = navigation.state.params.fav
            arr.push(c_item)
            navigation.state.params.setFav(arr)
            storeFav(arr)
        }
        else{
            setColor('white')
            const filtered = navigation.state.params.fav.filter( item => item.id != c_item.id )
            navigation.state.params.setFav(filtered)
            storeFav(filtered)
            if(type == 'favo'){
                setList(filtered)
            }   
        }
        
    }


    const oneDown = () => {
        if(sliderValue >= 1){
            updateSlider(sliderValue-1)
            setSliderValue2(sliderValue-1)
        }
    }

    const oneUp = () => {
        if(sliderValue < 100 - maxGrams){
            updateSlider(sliderValue+1)
            setSliderValue2(sliderValue+1)
        }
    }





    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y }}}], { useNativeDriver: true })
      


    const renderSlider = (index, CARD_HEIGHT) => {
        const position = Animated.subtract(index * CARD_HEIGHT, y);
        const isDisappearing = -CARD_HEIGHT;
        const isTop = 0;
        const isBottom = CARD_HEIGHT - CARD_HEIGHT;
        const isAppearing = CARD_HEIGHT;

        const translateY = Animated.add(y, y.interpolate({
            inputRange: [-index * CARD_HEIGHT, 0],
            outputRange: [index * CARD_HEIGHT, 0],
            extrapolateRight: 'clamp'
        }));

        const scale = position.interpolate({
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [1,0.5,0.5,1],
            extrapolate: 'clamp'
        })

        const opacity = position.interpolate({
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [1,0.2,0.2,1],
            extrapolate: 'clamp'
        })


        
        return(
            <Animated.View style={[styles2.modal_main, { opacity, transform: [ {scale}]}]}>
                <View style={styles.modal_main_info}>
                    <View style={styles.modal_main_info_row}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'white',
                                textAlign: 'center'
                            }}
                        >{currentItem.name}</Text>
                    </View>
                    <View style={styles.modal_main_info_row}>
                        <View style={styles.modal_main_info_props}>
                            <View style={styles.item_single_prop}>
                                <Text style={styles.text}>B: </Text>
                                <Text style={{color: '#f08773', fontWeight: 'bold'}}>{Math.round(currentItem.protein*sliderValue*0.01)}</Text>
                            </View> 
                            <View style={styles.item_single_prop}>
                                <Text style={styles.text}>W: </Text>
                                <Text style={{color: '#f07982', fontWeight: 'bold'}}>{Math.round(currentItem.carb*sliderValue*0.01)}</Text>
                                
                            </View>
                            <View style={styles.item_single_prop}>
                                <Text style={styles.text}>T: </Text>
                                <Text style={{color: '#ef6892', fontWeight: 'bold'}}>{Math.round(currentItem.fat*sliderValue*0.01)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.modal_main_slider}>
                    <View style={styles.modal_main_slider_row}>
                        <TouchableOpacity 
                            style={styles.modal_main_slider_butt}
                            onPress={() => oneDown()}
                        
                        >
                            <Text
                                style={{
                                    color: 'white'
                                }}
                            >-</Text>
                        </TouchableOpacity>
                        <View style={styles.modal_main_slider_text}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}
                            >{sliderValue}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.modal_main_slider_butt}
                            onPress={() => oneUp()}
                        >
                            <Text
                                style={{
                                    color: 'white'
                                }}
                            >+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modal_main_slider_row}>
                        <Slider
                            style={{width: 250, height: 40, marginTop: 10}}
                            value={sliderValue2}
                            onValueChange={
                                (sliderValue) => updateSlider(sliderValue)
                            }
                            step={1}
                            minimumValue={0}
                            maximumValue={100 - maxGrams}
                            minimumTrackTintColor="#f08773"
                            maximumTrackTintColor="#FFFFFF"
                            thumbTintColor='white'
                        />
                    </View>
                    
                </View>
                <View style={styles.modal_main_price}>
                    <FlatList
                        data={currentItem.weight}
                        renderItem={({ item }) =>(
                            <View style={[styles.item_weight, {width: windowWidth*0.2}]}>
                                <View style={styles.item_weight_props}>
                                    <Text
                                        style={{color: 'white'}}
                                    >{item.comb} kg</Text>
                                </View>
                                <View style={styles.item_weight_props}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}
                                    >{item.price}.00</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        contentContainerStyle={{flexGrow: 1,justifyContent: 'space-around', alignItems: 'center'}}

                    />
                </View>
                <View style={styles.modal_main_fav}>
                    <TouchableOpacity
                        onPress={() => addFav(currentItem)}
                        style={styles.modal_main_fav_touch}
                    >
                        <Image 
                            source={require('../images/heart.png')}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: color
                            }}
                        />
                    </TouchableOpacity>
                </View>
                
            </Animated.View>
        )
        
    }

    const renderDesc = () => {
        return(
            <Animated.View style={styles.modal_main}>
                <View style={{backgroundColor: '#241f36', width: '100%', height: '100%', padding: 10, justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{currentItem.desc}</Text>
                </View>
            </Animated.View>
        )
        
    }

    const submit = () => {
        if(screen == 1){
            return(
                <View style={styles2.modal_submit}>
                    <TouchableOpacity
                        style={styles2.modal_cancel}
                        onPress={() => notUpdateSlider()}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontWeight: 'bold'
                            }}
                        >ANULUJ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles2.modal_delete}
                        onPress={() => deleteItem(currentItem)}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >USUŃ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles2.modal_agree}
                        onPress={() => updateMakro()}
                    >
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >EDYTUJ</Text>
                    </TouchableOpacity>

                </View>
            )
        }
        else{
            return(
                <View style={styles.modal_submit}>
                        <TouchableOpacity
                            style={styles.modal_cancel}
                            onPress={() => notUpdateSlider()}
                        >
                            <Text
                                style={{
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}
                            >ANULUJ</Text>
                        </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modal_agree}
                                onPress={() => updateMakro()}
                            >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}
                                    >DODAJ</Text>
                            </TouchableOpacity>

                    </View>
            )
        }
    }

    const scroll = {
        'data': [
            {
                id: 1
            },
            {
                id: 2
            }
        ]
    }

  
    return(
        <View style={styles2.container}>
            <View style={{width: '100%', height: Constants.statusBarHeight}}></View>
            <View style={styles.suma}>
                <View style={styles.item_single_prop}>
                    <Text style={styles.text}>B: </Text>
                    <Text style={{color: '#f08773', fontWeight: 'bold'}}>{Math.round(proteinPrev)}</Text>
                </View> 
                <View style={styles.item_single_prop}>
                    <Text style={styles.text}>W: </Text>
                    <Text style={{color: '#f07982', fontWeight: 'bold'}}>{Math.round(carbPrev)}</Text>
                    
                </View>
                <View style={styles.item_single_prop}>
                    <Text style={styles.text}>T: </Text>
                    <Text style={{color: '#ef6892', fontWeight: 'bold'}}>{Math.round(fatPrev)}</Text>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={[styles2.modal_visible]}>
                        <AnimatedFlatList
                            scrollEventThrottle={16}
                            data={scroll.data}
                            renderItem={({ item }) => (
                                <View style={{width: windowWidth}}>
                                    { item.id == 1 ? renderSlider(1, 370) : renderDesc()}
                                </View>
                            )}
                            keyExtractor={item => item.id.toString()}
                            snapToAlignment={'start'}
                            decelerationRate={'fast'}
                            snapToInterval={windowHeight}
                            {...{onScroll}}
                        />
                        
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        {submit()}
                    </View>
                        
            </View>
        </View>
    )
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#241f36',
    },
    modal_container: {
        width:'100%',
        height: '100%',
    },
    modal_visible: {
        width: '100%',
        height: 370,
        alignItems: 'center',
    },
    modal_main:{
        width: '70%',
        height: 350,
        backgroundColor: '#332c4c',
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        marginLeft: '15%',
        marginVertical: 10,
    },
    modal_submit: {
        width: '90%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modal_cancel: {
        width: '30%',
        height: '70%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    modal_agree: {
        width: '30%',
        height: '70%',
        borderRadius: 10,
        backgroundColor: '#28a745',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_delete: {
        width: '30%',
        height: '70%',
        borderRadius: 10,
        backgroundColor: '#d73a3a',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
