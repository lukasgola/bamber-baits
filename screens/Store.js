import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';

import styles from '../styles/global'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { BackHandler } from 'react-native';

import ModalItem from '../components/ModalStock';

import ingredients from '../data/ingredients';
import types from '../data/types';

export default function Stock(props) {

    const windowHeight = Dimensions.get('window').height;

    const [modalVisible, setModalVisible] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderValue2, setSliderValue2] = useState(0);

    const [currentItem, setCurrentItem] = useState({id:'0',name:'beta', protein: 0, carb: 0, fat: 0, icon: null, weight: [], grams: 0, selectedWeight: null, price: null, desc: null});

    const [color, setColor] = useState('white')

    useEffect(() => {
        getFav();

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [])

    const backAction = () => {
        if (props.type == 'all' || props.type == 'favo' || props.type == 'own'){
            props.setList(props.stockItems)
            props.setType('all')
        }
        else{
            const filtered = props.stockItems.filter( item => item.icon == props.type)
            props.setList(filtered)
        }
    }

    const updateSlider = (value) => {
        setSliderValue(sliderValue + value)
        setCurrentItem(
            {
                id: currentItem.id,
                name: currentItem.name,
                protein: currentItem.protein,
                carb: currentItem.carb,
                fat: currentItem.fat,
                icon: currentItem.icon,
                weight: currentItem.weight,
                grams: sliderValue+value,
                desc: currentItem.desc
            })
    }
    const notUpdateSlider = () => {
        setModalVisible(!modalVisible)
        setSliderValue(0)
    }

    const updateMakro = () => {
        setModalVisible(!modalVisible)
        setSliderValue(0) 

        let test = true;
        props.stockItems.map( item => {
            if(item.id == currentItem.id){
                test = false
            }
        })

        if(test){
            props.stockItems.push(currentItem)
            
            props.storeData(props.stockItems);
        }
        else{
            props.stockItems.map( item => {
                if(item.id == currentItem.id){
                    item.grams = item.grams + sliderValue
                }
            } )
            props.storeData(props.stockItems);
        }
    }

    const getFav = async () => {
        try {
        const value = await AsyncStorage.getItem('@storage_Fav')
        if(value !== null){
            props.setFav(JSON.parse(value))
        }
        } catch(e) {
        // error reading value
        }
    }

    const onClick_Cat = (cat_item) => {
        if (cat_item.type == 'favo'){
            props.setList(props.fav)
            props.setType('favo')
        }
        else{
            const filtered = ingredients.filter( item => item.icon == cat_item.type)
            props.setList(filtered)
            props.setType(cat_item.type)
        }
    }

    const onClickModal = (item1) => {
        setModalVisible(true)
        setCurrentItem(
            {
                id: item1.id,
                name: item1.name,
                protein: item1.protein,
                carb: item1.carb,
                fat: item1.fat,
                icon: item1.icon,
                weight: item1.weight,
                grams: sliderValue,
                desc: item1.desc
            })
        setColor('white')

        props.fav.map( item => {
            if(item1.id === item.id){
                setColor('#d73a3a')
            }
        })
    }
    
    const renderPrice = (item) => {
        let price = 0;
        item.map( item => {
            if(item.comb == 1){
                price = item.price
            }
        })
        return price
        
    }


    const Item = ({ item }) => (
            <TouchableOpacity
                style={styles.item}
                onPress={() => [onClickModal(item), setModalVisible(true)]}
            >
                <View style={styles.item_row}>
                    <View style={styles.item_icon}>
                        <Image style={{width: 40, height: 40}} source={item.icon} />
                    </View>
                    <View style={styles.item_info}>
                        <View style={styles.item_info_1line}>
                            <View style={styles.item_info_1line_name}>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                            <View style={styles.item_info_1line_kilos}>
                                <View style={styles.item_info_1line_kilos_value}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 12
                                    }}>{renderPrice(item.weight)},00/kg</Text>
                                </View>
                            </View>
                            
                        </View>
                        <View style={styles.item_info_props}>
                            <View style={styles.item_info_props_makro}>
                                <View style={styles.item_single_prop}>
                                    <Text style={styles.text}>B: </Text>
                                    <Text style={{color: '#f08773', fontWeight: 'bold'}}>{item.protein}</Text>
                                </View> 
                                <View style={styles.item_single_prop}>
                                    <Text style={styles.text}>W: </Text>
                                    <Text style={{color: '#f07982', fontWeight: 'bold'}}>{item.carb}</Text>
                                    
                                </View>
                                <View style={styles.item_single_prop}>
                                    <Text style={styles.text}>T: </Text>
                                    <Text style={{color: '#ef6892', fontWeight: 'bold'}}>{item.fat}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
    );


    const EmptyListMessage = () => {
        return(
            <View style={{height: windowHeight*0.4, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#BBB'}}>Nie masz żadnych produktów</Text>
        </View>
        )
    };

  return (
    <View style={styles.container}>
        <View>
            <FlatList 
                data={types}
                style={styles.flatlist_type}
                renderItem={({ item }) =>(
                    <TouchableOpacity
                    style={[styles.flatlist_type_butt, {backgroundColor: item.type === props.type ? '#f08773' : '#2d2743'}]}
                    onPress={() => onClick_Cat(item)}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >{item.name}</Text>
                </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        <FlatList
            data={props.list}
            renderItem={Item}
            keyExtractor={item => item.id.toString()}
            style={styles.flatlist}
            ListEmptyComponent={EmptyListMessage}
            maxToRenderPerBatch={10}
            windowSize={12}
        />
        
        <ModalItem
            screen={2}
            visible={modalVisible}
            setVisible={setModalVisible}
            item={currentItem}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            maxGrams={0}
            color={color}
            setColor={setColor}
            value={sliderValue2}
            setSliderValue2={setSliderValue2}
            updateSlider={updateSlider}
            notUpdateSlider={notUpdateSlider}
            updateMakro={updateMakro}
            fav={props.fav}
            setFav={props.setFav}
            setList={props.setList}
            type={props.type}
        />
        
    </View>
  );
}

