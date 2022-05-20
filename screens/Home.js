import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions  } from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { LinearGradient } from "expo-linear-gradient";

import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faPlus
 } from '@fortawesome/free-solid-svg-icons'


export default function Home({ navigation }) {


  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [recipies, setRecipies] = useState([])

  const [currentDate, setCurrentDate] = useState({
    date: '',
    month: '',
    year: '',
  });

  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  let date = ` ${currentDate.date} ${monthNames[currentDate.month]} ${currentDate.year}`

  useEffect(() => {
    getData(),
    setCurrentDate({
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    })
  }, [])


  const getData = async () => {
      try {
          const recipiesAsync = await AsyncStorage.getItem('@storage_Recipies')

          if(recipiesAsync !== null){
            setRecipies(JSON.parse(recipiesAsync))
          }
      
      } catch(e) {
      // error reading value
      }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Recipies', JSON.stringify(value))
    } catch (error) {

    }
  }

  const onClickRecipe = (item) => {
    navigation.navigate('Recipe', {item, getData, recipies})
  }

  const newRecipe = () => {
    const tempRecipies = recipies
    const newRecipe = {
      id: recipies.length+1,
      name: 'Nowa kulka',
      productItems: [],
      grams: 0,
      protein: 0,
      carb: 0,
      fat: 0,
      kilos: 0,
      notes: [],
      photos: []
    }
    tempRecipies.push(newRecipe)

    setRecipies(tempRecipies)
    storeData(tempRecipies)
    getData()
  }

  const deleteRecipe = (id) => {
    const filtered = recipies.filter( item => item.id !== id)
    setRecipies(filtered)
    storeData(filtered)
  }

  const Item = ({item}) => (
    <View style={styles.block}>
      <TouchableOpacity 
        style={{width: '80%', height: '100%', justifyContent: 'center', paddingLeft: '5%'}}
        onPress={() => onClickRecipe(item)}
      >
          <Text style={{
            color: '#fff',
            fontSize: 16}}
          >{item.name}</Text>
      </TouchableOpacity>
      <Menu style={{width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <MenuTrigger 
            style={{padding: 15}}>
            <Image 
              source={require('../images/menu2.png')} 
              style={{height: 15, width: 15, tintColor: '#FFF'}} 
              resizeMode='contain' />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{width: 100}}>
            <MenuOption
              style={{width: '100%', height: 40, justifyContent: 'center', paddingHorizontal: 10}}
              onSelect={() => deleteRecipe(item.id)}>
              <Text style={{color: '#d73a3a'}}>Usuń</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
    </View>

  )


  const EmptyListMessage = () => {
    return(
      <View style={{height: windowHeight*0.4, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#BBB'}}>Nie masz żadnych receptur</Text>
    </View>
    )
  };

    
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={{flex: 1, height: Platform.OS === 'ios' ? windowHeight : windowHeight - Constants.statusBarHeight, marginTop: Constants.statusBarHeight}}>
      <TouchableOpacity
          style={[styles.addRecipe]}
          onPress={() => newRecipe()}
      >
          <FontAwesomeIcon 
              icon={ faPlus } 
              size={15}
              style={{
              color: '#FFF',
              }}
          />
      </TouchableOpacity>
        
        <View style={styles.menu}>
          <View style={[styles.menuBlock, {alignItems: 'baseline'}]}>
            <Image source={require('../images/logo.png')} style={{width: '100%'}} resizeMode='contain' />
          </View>
          <View style={[styles.menuBlock]}>
            
          </View>
          <Menu style={{height: '80%', width: '20%', justifyContent: 'center', alignItems: 'flex-end'}}>
            <MenuTrigger style={{width: 25, height: 25, marginRight: 10,}}>
                <Image source={require('../images/menu.png')} 
                  resizeMode='cover' 
                  style={{height: 25, width: 25, tintColor: '#FFF'}} />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{width: 100}}>
              <MenuOption
                style={{width: '100%', height: 40, justifyContent: 'center', paddingHorizontal: 10}}
                onSelect={() => navigation.navigate('MainStock')}>
                <Text>Magazyn</Text>
              </MenuOption>
              <MenuOption
                style={{width: '100%', height: 40, justifyContent: 'center', paddingHorizontal: 10}}
                onSelect={() => navigation.navigate('OwnIngredient')}>
                <Text>Własne</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
            
        </View>

        <View style={styles.home}>
          <LinearGradient
            colors={['#f08773', '#ef6892']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            style={{
                height: '90%',
                width: windowWidth*0.9,
                marginHorizontal: windowWidth*0.05,
                borderRadius: 10,
            }}
            > 
            <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#FFF', fontSize: 22, fontWeight: '700'}}>{date}</Text>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.flatlist}>
          <View style={styles.recipies}>
            <View style={styles.line}></View>
            <View style={styles.lineTitle}>
                <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>Receptury</Text>
            </View>
          </View>

          <FlatList
              data={recipies}
              renderItem={Item}
              keyExtractor={item => item.id.toString()}
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={EmptyListMessage}
          />
        </View>     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241f36'
  },
  menu:{
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuBlock: {
    height: '80%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  home: {
    width: '100%',
    height: '35%',
  },
  recipies: {
    flexDirection: 'row',
    width: '100%',
    height: '5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'white'
  },
  lineTitle: {
    position: 'absolute',
    backgroundColor: '#241f36',
    paddingHorizontal: 20,
  },
  flatlist:{
    paddingHorizontal: '5%',
    height: '55%',
  },
  block: {
    width: '100%',
    height: 50,
    backgroundColor: '#2d2743',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 5,
  },
  addRecipe: {
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
  },
})