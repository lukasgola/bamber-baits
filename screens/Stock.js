import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';

import ModalItem from '../components/ModalStock';

import types2 from '../data/types2';

export default function Stock(props) {
    
    const windowHeight = Dimensions.get('window').height;

    const [modalVisible, setModalVisible] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderValue2, setSliderValue2] = useState(0);

    const [currentItem, setCurrentItem] = useState({id:'0',name:'beta', protein: 0, carb: 0, fat: 0, icon: null, weight: [], grams: 0, selectedWeight: null, price: null, desc: null});

    const [color, setColor] = useState('white')

    const updateSlider = (value) => {
        if(sliderValue - value >= 0){
            setSliderValue(sliderValue - value)
            if(sliderValue - value == 0){
                deleteItem(currentItem)
            }
        }
        else{
            alert('Za mało kilogramów')
        }
    }

    const notUpdateSlider = () => {
        setModalVisible(!modalVisible)
        setSliderValue(0)
    }

    const updateMakro = () => {
        setModalVisible(!modalVisible)
        setSliderValue(0)

        props.stockItems.map( item => {
            if(item.id == currentItem.id){
                item.grams = sliderValue
            }
        })

        props.storeData(props.stockItems)
        props.setList(props.stockItems)
    }

    const deleteItem = (item) => {
        setModalVisible(!modalVisible)
        setSliderValue(0)
        const filtered = props.stockItems.filter( item => item.id != currentItem.id )
        const filtered2 = props.list.filter( item => item.id != currentItem.id )
        props.setStockItems(filtered)
        props.setList(filtered2)

        props.storeData(filtered)
    }


    const onClick_Cat = (cat_item) => {
        if (cat_item.type == 'all'){
            props.setList(props.stockItems)
            props.setType('all')
        }
        else{
            const filtered = props.stockItems.filter( item => item.icon == cat_item.type)
            props.setList(filtered)
            props.setType(cat_item.type)
        }
    }

    const onClickModal = (item1) => {
        setModalVisible(true) 
        setCurrentItem(item1)

        setSliderValue(item1.grams)
        setSliderValue2(item1.grams)

        setColor('white')
        props.fav.map( item => {
            if(item1.id === item.id){
                setColor('#d73a3a')
            }
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
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}>{item.grams}</Text>
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
                data={types2}
                style={styles.fav}
                renderItem={({ item }) =>(
                    <View style={{height: 70}}>
                        <TouchableOpacity
                        style={[styles.fav_butt, {backgroundColor: item.type === props.type ? '#f08773' : '#2d2743'}]}
                        onPress={() => onClick_Cat(item)}
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
        

        <ModalItem
            screen={1}
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
            deleteItem={deleteItem}
            fav={props.fav}
            setFav={props.setFav}
            setList={props.setList}
            type={props.type}
        />

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
    text_bold:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    icon: {
        height: 40,
        width: 40,
        tintColor: '#f08773',
    },
    whiteDot: {
        width: 16,
        height: 16,
        borderRadius: 7,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        borderRadius: 5,
        marginLeft: '5%',
        marginBottom: 15,
    },
    item_row: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
    },
    item_info: {
        width: '80%',
        height: '100%',
        alignItems: 'center',
    },
    item_icon: {
      width: '20%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  item_info_1line:{
        width: '100%',
        height: '50%',
        flexDirection: 'row',
    },
    item_info_1line_name: {
      width: '75%',
      height: '100%',
      justifyContent: 'center',
      paddingLeft: '5%'
    },
    item_info_1line_kilos: {
      width: '25%',
      height: '100%',
      justifyContent: 'center',
      padding: 5,
    },
    item_info_1line_kilos_value: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
      backgroundColor: '#241f36',
      justifyContent: 'center',
      alignItems: 'center'
    },
    item_info_props:{
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    item_info_props_makro:{
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#241f36',
        borderRadius: 5
    },
    item_single_prop: {
      width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
    }
});
