import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Stock from './Stock';
import Store from './Store';

import ingredients from '../data/ingredients';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArchive,
  faShoppingCart,
 } from '@fortawesome/free-solid-svg-icons'

function Menu(props) {
  return (
    <View style={{height: Constants.statusBarHeight + 60, backgroundColor: '#241f36'}}>
      <StatusBar style="light" />
      <View style={[styles.menu, {marginTop: Constants.statusBarHeight}]}>
          <View style={{width: '20%', height: '100%', justifyContent: 'center'}}>
              <TouchableOpacity 
                  style={styles.button}
                  onPress={() => props.goBack()}
                  >
                  <Image
                      source={require('../images/back.png')}
                      style={styles.icon}
                  />
              </TouchableOpacity>
          </View>
          <View style={{width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <TextInput 
                style={[styles.textInput]}
                value={props.title}
                onChangeText={props.onChangeTitle}
                onSubmitEditing={props.storeName}
                textAlign={'center'}
            />
          </View>
          <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => alert(JSON.stringify(props.stockItems))}
              >
                  <View style={styles.whiteDot}>
                      <Text 
                          style={{
                              color: 'black',
                              fontSize: 10,
                              fontWeight: 'bold'
                      }}>{props.stockItems.length}</Text>
                  </View>
                  <View style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                      <Text 
                          style={{
                              color: 'white',
                              fontSize: 12,
                              fontWeight: 'bold'
                      }}>{props.gramsPrev}</Text>
                      <Image
                          source={require('../images/bag.png')}
                          style={[styles.icon, {position: 'absolute'}]}
                      />
                  </View>
              </TouchableOpacity>
          </View>
      </View>
    </View>
    
  );
}

const Tab = createBottomTabNavigator();


export default function App({navigation}) {

  const [stockItems, setStockItems] = useState([])

  const [list, setList] = useState(stockItems)
  const [type, setType] = useState('all')

  const [fav, setFav] = useState([])

  useEffect(() => {
    getFav(),
    getData(),
    onLoad();
  }, [])

  const onLoad = () => {
    if(type == 'all'){
        setList(stockItems)
    }
    else if (type == 'favo'){
      setList(fav)
    }
    else{
        const filtered = stockItems.filter( item => item.icon == type)
        setList(filtered)
    }
  }

  const onClick_Cat = (cat_item, items) => {
    if (cat_item.type == 'all'){
        setList(stockItems)
        setType('all')
    }
    else if (cat_item.type == 'favo'){
      setList(fav)
      setType('favo')
    }
    else{
        const filtered = items.filter( item => item.icon == cat_item.type)
        setList(filtered)
        setType(cat_item.type)
    }
  }

  const setBusket = () => {
    if(type == 'favo' || type == 'all' || type == 'own'){
      setList(stockItems)
      setType('all')
    }
    else{
      const filtered = stockItems.filter( item => item.icon == type)
      setList(filtered)
    }
  }

  const setAddNotes = () => {
    if(type == 'all' || type == 'favo'){
      setList(fav)
      setType('favo')
    }
    else{
      const filtered = ingredients.filter( item => item.icon == type)
      setList(filtered)
    }
  }

  const getFav = async () => {
    try {
    const value = await AsyncStorage.getItem('@storage_Fav')
    if(value !== null){
        setFav(JSON.parse(value))
    }
    } catch(e) {
    // error reading value
    }
  }

  const storeData = async (arr) => {
    try {
        await AsyncStorage.setItem('@storage_Stock', JSON.stringify(arr))
    } catch (error) {

    }
  }

  const getData = async () => {
    try {
    const value = JSON.parse(await AsyncStorage.getItem('@storage_Stock'))
    if(value !== null){
        const filtered = value.filter( item => item.grams != 0)
        setStockItems(filtered)
        if(type == 'all'){
            setList(filtered)
        }
        else{
            const filtered2 = stockItems.filter( item => item.icon == props.type)
            setList(filtered2)
        }
    }
    } catch(e) {
    // error reading value
    }
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle:{
            height: Platform.OS === 'ios' ? 80 : 50,
            backgroundColor: '#2d2743'
          },
          headerShow:true, 
          header:(p) => <Menu 
            stockItems={stockItems}
            goBack={navigation.goBack}
          /> 
        }}
      >
        <Tab.Screen 
          name='Stock'
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <FontAwesomeIcon 
                  icon={ faArchive } 
                  size={20}
                  style={{
                    color: focused ? '#f08773' : '#FFF'
                  }}
                />
                <Text style={{color: '#FFF'}}>Kulka</Text>
              </View>
            )
          }}
          children={() => <Stock

            stockItems={stockItems}
            setStockItems={setStockItems}

            fav={fav}
            setFav={setFav}

            storeData={storeData}

            list={list}
            setList={setList}
            type={type}
            setType={setType}

            onClick_Cat={onClick_Cat}

            />}
          listeners={() => ({
            tabPress: (e) => {
              setBusket()
            }
          })}
        />
        <Tab.Screen 
          name='Store'
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <FontAwesomeIcon 
                  icon={ faShoppingCart } 
                  size={20}
                  style={{
                    color: focused ? '#f08773' : '#FFF'
                  }}
                />
                <Text style={{color: '#FFF'}}>Sklep</Text>
              </View>
            )
          }}
          children={() => <Store

            stockItems={stockItems}
            setStockItems={setStockItems}

            fav={fav}
            setFav={setFav}

            storeData={storeData}

            list={list}
            setList={setList}
            type={type}
            setType={setType}

            onClick_Cat={onClick_Cat}

            />}
            listeners={() => ({
              tabPress: (e) => {
                setAddNotes()
              }
            })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#241f36',
    },
  menu: {
      width: '100%',
      height: 60,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  text: {
      fontSize: 14,
      color: '#fff',
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
  button: {
      borderRadius: 20,
  },
  textInput:{
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
  },
  item_single_prop: {
      width: '33%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 0,
    elevation: 10
  }
})