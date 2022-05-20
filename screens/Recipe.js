import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Busket from './Busket';
import AddNote from './AddNote';
import Notes from './Notes';
import Photos from './Photos';
import Conclusion from './Conclusion';

import ingredients from '../data/ingredients';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArchive,
  faShoppingCart,
  faStickyNote,
  faImage,
  faCheckCircle
 } from '@fortawesome/free-solid-svg-icons'

function Menu(props) {

  const backAction = () => {
    props.getData()
  };

  return (
    <View style={{height: Constants.statusBarHeight + 100, backgroundColor: '#241f36'}}>
      <StatusBar style="light" />
      <View style={[styles.menu, {marginTop: Constants.statusBarHeight}]}>
          <View style={{width: '20%', height: '100%', justifyContent: 'center'}}>
              <TouchableOpacity 
                  style={styles.button}
                  onPress={() => [props.goBack(), backAction()]}>
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
                onPress={() => alert(props.type)}
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
      <View style={styles.suma}>
            <View style={styles.item_single_prop}>
                <Text style={styles.text}>B: </Text>
                <Text style={{color: '#f08773', fontWeight: 'bold'}}>{Math.round(props.proteinPrev)}</Text>
            </View> 
            <View style={styles.item_single_prop}>
                <Text style={styles.text}>W: </Text>
                <Text style={{color: '#f07982', fontWeight: 'bold'}}>{Math.round(props.carbPrev)}</Text>
                
            </View>
            <View style={styles.item_single_prop}>
                <Text style={styles.text}>T: </Text>
                <Text style={{color: '#ef6892', fontWeight: 'bold'}}>{Math.round(props.fatPrev)}</Text>
                
            </View>
        </View>
    </View>
    
  );
}

const Tab = createBottomTabNavigator();


export default function App({navigation}) {

  const [title, onChangeTitle] = useState(navigation.state.params.item.name)

  const [proteinValue, setProteinValue] = useState(navigation.state.params.item.protein);
  const [carbValue, setCarbValue] = useState(navigation.state.params.item.carb);
  const [fatValue, setFatValue] = useState(navigation.state.params.item.fat);
  const [gramsValue, setGramsValue] = useState(navigation.state.params.item.grams);

  const [proteinPrev, setProteinPrev] = useState(proteinValue);
  const [carbPrev, setCarbPrev] = useState(carbValue);
  const [fatPrev, setFatPrev] = useState(fatValue);
  const [gramsPrev, setGramsPrev] = useState(gramsValue);

  const [kilos, setKilos] = useState(navigation.state.params.item.kilos)
  const [actKilos, setActKilos] = useState(kilos)

  const [recipies, setRecipies] = useState(navigation.state.params.recipies)
  const [stockItems, setStockItems] = useState(navigation.state.params.item.productItems)

  const [fav, setFav] = useState([])

  const [type, setType] = useState('all')
  const [list, setList] = useState(stockItems)


  useEffect(() => {
    getFav();
    onLoad();
    getData();
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

  const storeData = async (items, grams, protein, carb, fat) => {
    recipies.map( item => {
        if(item.id == navigation.state.params.item.id){
            item.name = title
            item.productItems = items
            item.grams = grams
            item.protein = protein
            item.carb = carb
            item.fat = fat
            item.kilos = kilos
        }
    })
    try {
        await AsyncStorage.setItem('@storage_Recipies', JSON.stringify(recipies))
    } catch (error) {

    }
  } 

  const storeName = () => {
    storeData(stockItems, gramsPrev, proteinPrev, carbPrev, fatPrev)
  }

  const [ownProducts, setOwnProducts] = useState([])

    const getData = async () => {
        try {
            const recipiesAsync = await AsyncStorage.getItem('@storage_OwnProducts')
  
            if(recipiesAsync !== null){
                setOwnProducts(JSON.parse(recipiesAsync))
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
            getData={navigation.state.params.getData}
            getPreview={navigation.state.params.getPreview}
            item={navigation.state.params.item}
            goBack={navigation.goBack}

            title={title}
            onChangeTitle={onChangeTitle}
            storeName={storeName}

            proteinValue={proteinValue}
            carbValue={carbValue}
            fatValue={fatValue}
            gramsValue={gramsValue}

            proteinPrev={proteinPrev}
            carbPrev={carbPrev}
            fatPrev={fatPrev}
            gramsPrev={gramsPrev}

            recipies={recipies}
            stockItems={stockItems}

            type={type}

          /> 
        }}
      >
        <Tab.Screen 
          name='Busket'
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
          children={() => <Busket
            item={navigation.state.params.item}
            recipies={recipies}
            getData={navigation.state.params.getData}
            getPreview={navigation.state.params.getPreview}

            proteinValue={proteinValue}
            carbValue={carbValue}
            fatValue={fatValue}
            gramsValue={gramsValue}

            setProteinValue={setProteinValue}
            setCarbValue={setCarbValue}
            setFatValue={setFatValue}
            setGramsValue={setGramsValue}

            proteinPrev={proteinPrev}
            carbPrev={carbPrev}
            fatPrev={fatPrev}
            gramsPrev={gramsPrev}

            setProteinPrev={setProteinPrev}
            setCarbPrev={setCarbPrev}
            setFatPrev={setFatPrev}
            setGramsPrev={setGramsPrev}

            kilos={kilos}
            setKilos={setKilos}
            actKilos={actKilos}
            setActKilos={setActKilos}

            stockItems={stockItems}
            setStockItems={setStockItems}

            fav={fav}
            setFav={setFav}
            getFav={getFav}

            storeData={storeData}

            list={list}
            setList={setList}
            type={type}
            setType={setType}

            onClick_Cat={onClick_Cat}
            navigation={navigation}

            />}
          listeners={() => ({
            tabPress: (e) => {
              setBusket()
            }
          })}
        />
        <Tab.Screen 
          name='AddNote'
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
          children={() => <AddNote
            item={navigation.state.params.item}
            recipies={recipies}
            getData={navigation.state.params.getData}
            getPreview={navigation.state.params.getPreview}

            proteinValue={proteinValue}
            carbValue={carbValue}
            fatValue={fatValue}
            gramsValue={gramsValue}

            setProteinValue={setProteinValue}
            setCarbValue={setCarbValue}
            setFatValue={setFatValue}
            setGramsValue={setGramsValue}

            proteinPrev={proteinPrev}
            carbPrev={carbPrev}
            fatPrev={fatPrev}
            gramsPrev={gramsPrev}

            setProteinPrev={setProteinPrev}
            setCarbPrev={setCarbPrev}
            setFatPrev={setFatPrev}
            setGramsPrev={setGramsPrev}

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
            navigation={navigation}

            />}
            listeners={() => ({
              tabPress: (e) => {
                setAddNotes()
              }
            })}
        />
        <Tab.Screen 
          name='Conclusion'
          options={{
            tabBarIcon: ({focused}) => (
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#d73a3a',
                    top: -20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...styles.shadow
                  }}
                >
                  <FontAwesomeIcon 
                    icon={ faCheckCircle } 
                    size={30}
                    style={{
                      color: '#FFF'
                    }}
                  />
                </View>
            )
          }}
          children={() => <Conclusion
            recipies={recipies}
            item={navigation.state.params.item}
            stockItems={stockItems}
            actKilos={actKilos}

          />}
        />
        <Tab.Screen 
          name='Notes'
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <FontAwesomeIcon 
                  icon={ faStickyNote } 
                  size={20}
                  style={{
                    color: focused ? '#f08773' : '#FFF'
                  }}
                />
                <Text style={{color: '#FFF'}}>Notatki</Text>
              </View>
            )
          }}
          children={() => <Notes 
            recipies={recipies}
            item={navigation.state.params.item}
          />}
        />
        <Tab.Screen 
          name='Photos'
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <FontAwesomeIcon 
                  icon={ faImage } 
                  size={20}
                  style={{
                    color: focused ? '#f08773' : '#FFF'
                  }}
                />
                <Text style={{color: '#FFF'}}>Zdjęcia</Text>
              </View>
            )
          }}
          children={() => <Photos
            recipies={recipies}
            item={navigation.state.params.item}
            navigation={navigation}
          />}
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
  suma:{
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#2d2743',
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