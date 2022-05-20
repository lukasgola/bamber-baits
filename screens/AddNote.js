import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';

import styles from '../styles/global'

import { BackHandler } from 'react-native';

import ingredients from '../data/ingredients';
import types from '../data/types';

export default function AddNote(props) {

    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
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

    const updateMakro = (item1, protein, carb, fat, grams, sliderValue) => {
        
        let test = true;
        props.stockItems.map( item => {
            if(item.id == item1.id){
                test = false
            }
        })

        if(test){
            item1.grams = sliderValue
            props.stockItems.push(item1)

            props.setProteinPrev(protein)
            props.setCarbPrev(carb)
            props.setFatPrev(fat)
            props.setGramsPrev(grams)
            props.setProteinValue(protein)
            props.setCarbValue(carb)
            props.setFatValue(fat)
            props.setGramsValue(grams)

            props.storeData(props.stockItems, grams, protein, carb, fat)

        }
        else{
            alert('Ten element już jest na liście')
        }
    }
    

    const onClickModal = (item1) => {

        let color = 'white';
        props.fav.map( item => {
            if(item1.id === item.id){
                color = '#d73a3a'
            }
        })
        const cur_item = {
            id: item1.id,
            name: item1.name,
            protein: item1.protein,
            carb: item1.carb,
            fat: item1.fat,
            icon: item1.icon,
            weight: item1.weight,
            grams: 0,
            desc: item1.desc

        }

        props.navigation.navigate('ItemSettings', {
            updateMakro,
            screen: 2,
            type: props.type,
            color: color,
            list: props.list,
            setList: props.setList,
            fav: props.fav,
            setFav: props.setFav,
            currentItem: cur_item,
            sliderValue: 0,
            proteinValue: props.proteinValue,
            carbValue: props.carbValue,
            fatValue: props.fatValue,
            gramsValue: props.gramsValue,
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
                onPress={() => onClickModal(item)}
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
                <Text style={{color: '#BBB'}}>{ props.type == 'favo' ? 'Nie masz żadnych ulubionych' : 'Nie masz żadnych własnych'}</Text>
        </View>
        )
    };



  return (
    <View style={styles.container}>
        <View style={styles.flatlist_type}>
            <FlatList 
                data={types}
                style={styles.flatlist_type}
                renderItem={({ item }) =>(
                    <TouchableOpacity
                    style={[styles.flatlist_type_butt, {backgroundColor: item.type === props.type ? '#f08773' : '#2d2743'}]}
                    onPress={() => props.onClick_Cat(item, ingredients)}
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

    </View>
  );
}
