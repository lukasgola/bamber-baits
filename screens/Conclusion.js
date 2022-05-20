import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LinearGradient } from "expo-linear-gradient";

export default function Conclusion(props) {

  const windowWidth = Dimensions.get('window').width;

  const calculateTotal = () => {
    let result = 0
    props.stockItems.map( item => {
        result = result + renderPrice(item)
    })

    return(result)
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

  const storeStock = async (arr) => {
    try {
        await AsyncStorage.setItem('@storage_Stock', JSON.stringify(arr))
    } catch (error) {

    }
  }

  const updateStock = async () => {
    try {
        const stock = JSON.parse(await AsyncStorage.getItem('@storage_Stock'))
        if(stock !== null){
            let table1 = props.stockItems
            let table2 = props.stockItems
            
            props.stockItems.map( item => {
                stock.map( item2 => {
                    if(item.id == item2.id){
                        table1 = table1.filter( x => x.id != item.id)
                        if(Math.ceil(item.grams * props.actKilos/100) <= item2.grams){
                          table2 = table2.filter( x => x.id != item.id)
                        }
                    }
                })
            })

            table1.map( item => {
              table2.map( item2 => {
                if(item.id == item2.id){
                  table2 = table2.filter( x => x.id != item.id)
                }
              })
            })

            if(props.actKilos == 0){
              alert('Wprowadź liczbę kilogramów do zrobienia')
            }
            else if(table1.length !== 0 || table2.length !== 0){
              alert('Brakujące elementy: ' + table1.map(item => '\n' + item.name) 
                + '\nNiewystarczająco kilogramów: ' + table2.map(item => '\n' + item.name) )
            }
            
            else if(table1.length == 0 && table2.length == 0){
                props.stockItems.map( item => {
                    stock.map( item2 => {
                        if(item.id == item2.id){
                            if(Math.ceil(item.grams * props.actKilos/100) <= item2.grams){
                                item2.grams = item2.grams - Math.ceil(item.grams * props.actKilos/100)
                            }
                        }
                    })
                })
                storeStock(stock)
            }
        }
        } catch(e) {
        // error reading value
        }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#241f36'}}>
      <View style={{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress
          value={props.item.grams}
          duration={1000}
          radius={windowWidth*0.2}
          activeStrokeColor={'#f08773'}
          activeStrokeSecondaryColor={'#ef6892'}
          inActiveStrokeColor={'rgba(0,0,0,0.2)'}
          textColor={'#FFF'}
          maxValue={100}
          valueSuffix={'%'}
          strokeLinecap={'round'}
          activeStrokeWidth={5}
          inActiveStrokeWidth={15}
        />
      </View>
      <View style={{width: '100%', height: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress
            value={props.item.protein}
            radius={windowWidth*0.5*0.15}
            duration={1000}
            activeStrokeColor={'#f08773'}
            activeStrokeSecondaryColor={'#ef6892'}
            inActiveStrokeColor={'rgba(0,0,0,0.2)'}
            textColor={'#FFF'}
            maxValue={100}
            valueSuffix={'%'}
            strokeLinecap={'round'}
            activeStrokeWidth={5}
            inActiveStrokeWidth={15}
          />
          <Text style={{color: '#FFF', fontSize: 14}}>Białko</Text>
        </View>
        <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress
            value={props.item.carb}
            radius={windowWidth*0.5*0.15}
            duration={1000}
            activeStrokeColor={'#f08773'}
            activeStrokeSecondaryColor={'#ef6892'}
            inActiveStrokeColor={'rgba(0,0,0,0.2)'}
            textColor={'#FFF'}
            maxValue={100}
            valueSuffix={'%'}
            strokeLinecap={'round'}
            activeStrokeWidth={5}
            inActiveStrokeWidth={15}
          />
          <Text style={{color: '#FFF', fontSize: 14}}>Węgle</Text>
        </View>
        <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress
            value={props.item.fat}
            radius={windowWidth*0.5*0.15}
            duration={1000}
            activeStrokeColor={'#f08773'}
            activeStrokeSecondaryColor={'#ef6892'}
            inActiveStrokeColor={'rgba(0,0,0,0.2)'}
            textColor={'#FFF'}
            maxValue={100}
            valueSuffix={'%'}
            strokeLinecap={'round'}
            activeStrokeWidth={5}
            inActiveStrokeWidth={15}
          />
          <Text style={{color: '#FFF', fontSize: 14}}>Tłuszcz</Text>
        </View>
      </View>
      <View style={{width: '100%', height: '45%'}}>
        <View style={{width: '100%', height: '50%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <View style={{width: '40%', height: '60%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20}}>{calculateTotal()} zł</Text>
          </View>
          <View style={{width: '40%', height: '60%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20}}>{props.actKilos} kg</Text>
          </View>
        </View>
        <View style={{width: '100%', height: '50%', alignItems: 'center'}}>
          <TouchableOpacity 
            onPress={() => updateStock()}
            style={{width: '40%', height: '60%'}}
          >
            <LinearGradient
            colors={['#f08773', '#ef6892']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            style={{width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
            > 
              <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20}}>STWÓRZ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
}
