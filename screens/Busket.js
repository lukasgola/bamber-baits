import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

import types2 from '../data/types2';

export default function Busket(props) {

    const windowHeight = Dimensions.get('window').height;
  
    const [modalVisible2, setModalVisible2] = useState(false);
  
    const updateMakro = (item1, protein, carb, fat, grams, sliderValue) => {
        
        props.setProteinPrev(protein)
        props.setCarbPrev(carb)
        props.setFatPrev(fat)
        props.setGramsPrev(grams)
        props.setProteinValue(protein)
        props.setCarbValue(carb)
        props.setFatValue(fat)
        props.setGramsValue(grams)
  
        props.stockItems.map( item => {
            if(item.id == item1.id){
                item.grams = sliderValue
            }
        })
  
        props.storeData(props.stockItems, grams, protein, carb, fat)
    }
  
    const deleteItem = (item) => {
        const filtered = props.stockItems.filter( item1 => item1.id != item.id )
        const filtered2 = props.list.filter( item1 => item1.id != item.id )
        props.setStockItems(filtered)
        props.setList(filtered2)
  
        props.setGramsPrev(props.gramsValue - item.grams)
        props.setProteinPrev(props.proteinValue - item.grams*item.protein*0.01)
        props.setCarbPrev(props.carbValue - item.grams*item.carb*0.01)
        props.setFatPrev(props.fatValue - item.grams*item.fat*0.01)
        props.setProteinValue(props.proteinValue - item.grams*item.protein*0.01)
        props.setCarbValue(props.carbValue - item.grams*item.carb*0.01)
        props.setFatValue(props.fatValue - item.grams*item.fat*0.01)
        props.setGramsValue(props.gramsValue - item.grams)
        
        props.storeData(filtered, 
            props.gramsValue - item.grams, 
            props.proteinValue - item.grams*item.protein*0.01, 
            props.carbValue - item.grams*item.carb*0.01,
            props.fatValue - item.grams*item.fat*0.01)
    }
  
  
    const showKilos = () => {
        setModalVisible2(true)
    }
  
    const updateKilos = (value) => {
        setModalVisible2(false)
        props.setActKilos(value)
        props.storeData(props.stockItems, props.gramsPrev, props.proteinPrev, props.carbPrev, props.fatPrev)
    }
  
    const notUpdateKilos = () => {
        setModalVisible2(false)
    }
  
    const renderPrice = (item) => {
        let price = 0;
        item.weight.map( item => {
            if(item.comb == 1){
                price = item.price
            }
        })
        let result = Math.ceil(item.grams * props.actKilos/100)*price
  
        return result
    }
  
  
    const onChangeKilos = (value) => {
        props.setKilos(value)
    }
  
  
    const onClickModal = (item1) => {
  
        let color = 'white';
        props.fav.map( item => {
            if(item1.id === item.id){
                color = '#d73a3a'
            }
        })

        props.navigation.navigate('ItemSettings', {
            updateMakro,
            deleteItem,
            screen: 1,
            type: props.type,
            color: color,
            list: props.list,
            setList: props.setList,
            fav: props.fav,
            setFav: props.setFav,
            currentItem: item1,
            sliderValue: item1.grams,
            proteinValue : props.proteinValue,
            carbValue: props.carbValue,
            fatValue: props.fatValue,
            gramsValue: props.gramsValue,
        })
    }
  
    const renderLength = (cat_item) => {
        if(cat_item.type !== 'favo'){
            const filtered = props.stockItems.filter( item1 => item1.icon == cat_item.type)
            if(filtered.length !== 0){
                return(
                    <View style={styles.redDot}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 10}}>{filtered.length}</Text>
                    </View>  
                )
            }
        }
    }
      
  
    const Item = ({ item }) => (
            <TouchableOpacity
                style={styles.item}
                onPress={() => onClickModal(item)}
            >
                <View style={styles.item_icon}>
                    <Image style={{width: 40, height: 40}} source={item.icon} />
                </View>
                <View style={styles.item_info}>
                    <View style={styles.item_info_name}>
                        <Text style={styles.text}>{item.name}</Text>
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
                <View style={styles.item_details}>
                    <View style={styles.item_details_row}>
                        <Text style={{color: '#FFF'}}>{item.grams * props.actKilos/100}</Text>
                    </View>
                    <View style={styles.item_details_row}>
                    <Text style={{color: '#FFF'}}>{renderPrice(item)},00</Text>
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
        <TouchableOpacity
            style={[styles.kilosButt, {bottom: 20}]}
            onPress={() => showKilos()}
        >
            <Text style={{color: 'white', fontWeight: 'bold'}}>{props.actKilos}</Text>
        </TouchableOpacity>
        <View>
            <FlatList
                data={types2}
                style={styles.fav}
                renderItem={({ item }) =>(
                    <View style={{height: 70}}>
                        <TouchableOpacity
                            style={[styles.fav_butt, {backgroundColor: item.type === props.type ? '#f08773' : '#2d2743'}]}
                            onPress={() => props.onClick_Cat(item, props.stockItems)}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >{item.name}</Text>
                        </TouchableOpacity>
                        {renderLength(item)}
                </View>
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
        
  
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible2(!modalVisible2);
            }}
        >
            <View style={styles.modal_container}>
                <View style={styles.modal_visible}>
                    <View style={[styles.modal_main, {justifyContent: 'center'}]}>
                        <View style={{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}
                            >Kilogramy</Text>
                        </View>
                        <View style={{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18
                            }}>{props.kilos}</Text>
                        </View>
                        <View style={{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                            <Slider
                                style={{width: 250, height: 40, marginTop: 10}}
                                value={props.actKilos}
                                onValueChange={
                                    (sliderValue) => onChangeKilos(sliderValue)
                                }
                                step={1}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#f08773"
                                maximumTrackTintColor="#FFFFFF"
                                thumbTintColor='white'
                            />
                        </View>
                    </View>
                    <View style={styles.modal_submit}>
                        <TouchableOpacity
                            style={styles.modal_cancel}
                            onPress={() => notUpdateKilos()}
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
                                onPress={() => updateKilos(props.kilos)}
                            >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}
                                    >EDYTUJ</Text>
                            </TouchableOpacity>
                    </View>
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
        width: '100%',
        marginTop: 5
    },
    text: {
        fontSize: 14,
        color: '#fff',
    },
    redDot: {
        width: 16,
        height: 16,
        borderRadius: 7,
        backgroundColor: '#d73a3a',
        position: 'absolute',
        bottom: 10,
        right: 5,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: '90%',
        height: 80,
        backgroundColor: '#2d2743',
        borderRadius: 10,
        marginLeft: '5%',
        marginBottom: 15,
        flexDirection: 'row'
    },
    item_icon: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item_info: {
        width: '60%',
        alignItems: 'center',
    },
    item_info_name:{
        width: '100%',
        height: '55%',
        justifyContent: 'center',
        paddingLeft: '5%',
    },
    item_info_props:{
        width: '100%',
        height: '50%',
        paddingHorizontal: '5%'
    },
    item_info_props_makro: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#241f36',
        borderRadius: 5
    },
    item_details: {
        width: '20%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    item_details_row: {
        width: '80%',
        height: 30,
        backgroundColor: '#241f36',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_single_prop: {
        width: '33%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
    },
    modal_container: {
        width:'100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        
    },
    modal_visible: {
        width: '100%',
        height: 450,
        alignItems: 'center',
        position: 'absolute',
        bottom: 150,
    },
    modal_main:{
        width: '70%',
        height: 350,
        backgroundColor: '#332c4c',
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        marginVertical: 10
    },    
    modal_submit: {
        width: '70%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modal_cancel: {
        width: '45%',
        height: '70%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    modal_agree: {
        width: '45%',
        height: '70%',
        borderRadius: 10,
        backgroundColor: '#28a745',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fav: {
        width: '100%',
        height: 70,
    },
    fav_butt: {
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginTop: 15,
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
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
