import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import EditIngredients from './EditIngredients';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArchive,
 } from '@fortawesome/free-solid-svg-icons'

 function Menu(props) {
    return (
        <View style={{height: Constants.statusBarHeight + 60, backgroundColor: '#241f36'}}>
            <StatusBar style="light" />
            <View style={[styles.menu, {marginTop: Constants.statusBarHeight}]}>
                <View style={{width: '20%', height: '100%', justifyContent: 'center'}}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => props.navigation.goBack()}
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

  const [stockItems, setStockItems] = useState(navigation.state.params.stockItems)


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle:{
            height: 50,
            backgroundColor: '#2d2743'
          },
          headerShow:true, 
          header:(p) => <Menu
            navigation={navigation}
          /> 
        }}
      >
    <Tab.Screen 
        name='EditIngredients'
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
            <Text style={{color: '#FFF'}}>Edycja</Text>
            </View>
        )
        }}
        children={() => <EditIngredients
        
            currentItem={navigation.state.params.currentItem}
            stockItems={stockItems}
            setStockItems={setStockItems}

            storeData={navigation.state.params.storeData}
            getData={navigation.state.params.getData}

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