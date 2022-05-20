import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Dimensions, Animated } from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

import types2 from '../data/types2';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListIngredients (props) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  
    const [modalVisible, setModalVisible] = useState(false);

    const [currentItem, setCurrentItem] = useState({id:'0',name:'beta', protein: 0, carb: 0, fat: 0, icon: null, weight: [], selectedWeight: null, price: null, desc: null});
  
    const [color, setColor] = useState('white')

    const [stockItems, setStockItems] = useState([])


    const storeData = props.storeData
    const getData = props.getData

    const notUpdateSlider = () => {
        setModalVisible(false)
    }

    updateMakro = () => {
        props.navigation.navigate('EditMain', {currentItem, stockItems, storeData, getData})
        setModalVisible(false)
    }
  
    const deleteItem = (id) => {
        setModalVisible(!modalVisible)
        const filtered = props.stockItems.filter( item => item.id !== id )
        props.setStockItems(filtered)
        props.setList(filtered)
        props.storeData(filtered)
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

    const onClickModal = (item1) => {
        setModalVisible(true)
        setStockItems(props.stockItems)
        setCurrentItem(
            {
                id: item1.id,
                name: item1.name,
                protein: item1.protein,
                carb: item1.carb,
                fat: item1.fat,
                icon: item1.icon,
                weight: item1.weight,
                desc: item1.desc
            })
            props.fav.map( item2 => {
                if(item2.id == item1.id){
                    setColor('#d73a3a')
                }
            })

    }


    const addFav = (c_item) => {
        let test2 = true;
        props.fav.map( item1 => {
            if(item1.id == c_item.id){
                test2 = false
            }
        })
        
        if(test2){
            setColor('#d73a3a')
            const arr = props.fav
            arr.push(c_item)
            props.setFav(arr)
            storeFav(arr)
        }
        else{
            setColor('white')
            const filtered = props.fav.filter( item => item.id != c_item.id )
            props.setFav(filtered)
            storeFav(filtered) 
        }

        
    }

    const storeFav = async (arr) => {
        try {
            await AsyncStorage.setItem('@storage_Fav', JSON.stringify(arr))
        } catch (error) {

        }
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
                                <Text style={{color: '#f08773', fontWeight: 'bold'}}>{currentItem.protein}</Text>
                            </View> 
                            <View style={styles.item_single_prop}>
                                <Text style={styles.text}>W: </Text>
                                <Text style={{color: '#f07982', fontWeight: 'bold'}}>{currentItem.carb}</Text>
                                
                            </View>
                            <View style={styles.item_single_prop}>
                                <Text style={styles.text}>T: </Text>
                                <Text style={{color: '#ef6892', fontWeight: 'bold'}}>{currentItem.fat}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.modal_main_slider, {height: 80}]}>
                    
                </View>
                <View style={[styles.modal_main_price, {height: 80}]}>
                    <FlatList
                        data={currentItem.weight}
                        renderItem={({ item }) =>(
                            <View 
                                onPress={() => updateSlider(item.comb)}
                                style={[styles.item_weight, {width: windowWidth*0.2}]}>
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
                    style={styles.modal_delete}
                    onPress={() => deleteItem(currentItem.id)}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >USUŃ</Text>
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
                        >EDYTUJ</Text>
                </TouchableOpacity>

            </View>
        )
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
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
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
    item_weight: {
        backgroundColor: '#241f36',
        height: 50,
        borderRadius: 5
    },
    item_weight_props: {
        width: '100%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginLeft: '15%',
        marginVertical: 10
    },
    modal_main_info: {
        width: '100%',
        height: 120,
    },
    modal_main_info_row: {
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal_main_info_props: {
        width: '90%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#241f36',
        borderRadius: 5,
    },
    modal_main_slider: {
      width: '100%',
      height: 100,
      //backgroundColor: 'red'
  },
  modal_main_slider_row: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  
  },
  modal_main_slider_butt: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#241f36',
  },
  modal_main_slider_text: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_main_fav: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_main_fav_touch: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_main_price: {
    width: '100%',
    height: 60,
  },    
  modal_submit: {
      width: '70%',
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
