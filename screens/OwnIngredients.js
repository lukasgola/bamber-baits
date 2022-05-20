import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AddIngredient from './AddIngredient';
import ListIngredients from './ListIngredients';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArchive,
  faPlus
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
            <Text style={styles.textInput}>Własne</Text>
          </View>
          <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
              
          </View>
      </View>
    </View>
    
  );
}

const Tab = createBottomTabNavigator();


export default function OwnIngredients({navigation}) {

  const [stockItems, setStockItems] = useState([])

  const [list, setList] = useState(stockItems)
  const [type, setType] = useState('all')

  const [fav, setFav] = useState([])



  useEffect(() => {
    getData();
    getFav();
  }, [])

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
        await AsyncStorage.setItem('@storage_OwnProducts', JSON.stringify(arr))
    } catch (error) {

    }
  }

  const getData = async () => {
    try {
    const value = JSON.parse(await AsyncStorage.getItem('@storage_OwnProducts'))
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


  const onClick_Cat = (cat_item, items) => {
    if (cat_item.type == 'all'){
        setList(stockItems)
        setType('all')
    }
    else if( cat_item.type == 'own'){
      setList(ownProducts)
      setType('own')
    }
    else{
        const filtered = items.filter( item => item.icon == cat_item.type)
        setList(filtered)
        setType(cat_item.type)
    }
  }


  const setOwn = () => {
    if(type == 'favo' || type == 'all' || type == 'own'){
        const filtered = stockItems.filter( item => item.icon == item.icon)
      setList(filtered)
      setType('all')
    }
    else{
      const filtered = stockItems.filter( item => item.icon == type)
      setList(filtered)
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
            goBack={navigation.goBack}
          /> 
        }}
      >
    <Tab.Screen 
        name='ListIngredients'
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
            <Text style={{color: '#FFF'}}>Własne</Text>
            </View>
        )
        }}
        children={() => <ListIngredients
        
            stockItems={stockItems}
            setStockItems={setStockItems}

            storeData={storeData}
            getData={getData}

            list={list}
            setList={setList}
            type={type}
            setType={setType}

            onClick_Cat={onClick_Cat}
            navigation={navigation}

            fav={fav}
            setFav={setFav}

        />}
        listeners={() => ({
        tabPress: (e) => {
            setOwn()
        }
        })}
    />
    <Tab.Screen 
        name='AddIngredient'
        options={{
        tabBarIcon: ({focused}) => (
            <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            <FontAwesomeIcon 
                icon={ faPlus } 
                size={20}
                style={{
                color: focused ? '#f08773' : '#FFF'
                }}
            />
            <Text style={{color: '#FFF'}}>Dodaj</Text>
            </View>
        )
        }}
        children={() => <AddIngredient
        
        stockItems={stockItems}
        setStockItems={setStockItems}

        storeData={storeData}

        navigation={navigation}

        />}
        listeners={() => ({
        tabPress: (e) => {
            
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