import React, {useState} from "react";
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image, TextInput, Modal, Dimensions, Animated } from 'react-native';

import Slider from '@react-native-community/slider';

import styles from '../styles/global'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


import AsyncStorage from '@react-native-async-storage/async-storage'



const ModalItem = (props) => {


    const screen = props.screen
    const modalVisible = props.visible
    const setModalVisible = props.setVisible
    const currentItem = props.item
    const sliderValue = props.sliderValue
    const setSliderValue = props.setSliderValue
    const maxGrams = props.maxGrams
    const color = props.color
    const setColor = props.setColor

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;


    const updateSlider = props.updateSlider
    const notUpdateSlider = props.notUpdateSlider
    const updateMakro = props.updateMakro
    const deleteItem = props.deleteItem
    const fav = props.fav
    const setFav = props.setFav
    const setList = props.setList
    const type = props.type

    let value = props.value
    const setSliderValue2 = props.setSliderValue2


    const storeFav = async (arr) => {
        try {
            await AsyncStorage.setItem('@storage_Fav', JSON.stringify(arr))
        } catch (error) {

        }
    }


    const addFav = (c_item) => {
        let test2 = true;
        fav.map( item1 => {
            if(item1.id == c_item.id){
                test2 = false
            }
        })
        
        if(test2){
            setColor('#d73a3a')
            const arr = fav
            arr.push(c_item)
            setFav(arr)
            storeFav(arr)
        }
        else{
            setColor('white')
            const filtered = fav.filter( item => item.id != c_item.id )
            setFav(filtered)
            storeFav(filtered)
            if(type == 'favo'){
                setList(filtered)
                setModalVisible(!modalVisible)
                setSliderValue(0)
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
            <Animated.View style={[styles.modal_main, { opacity, transform: [ {scale}]}]}>
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
                            value={value}
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
                <View style={styles.modal_submit}>
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

        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modal_container}>
                <View style={[styles.modal_visible]}>

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
                    
                    {submit()}
                    
                </View>
                
            </View>
                
        </Modal>

    )

}

export default ModalItem


const styles2 = StyleSheet.create({
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
})