import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput } from 'react-native';

import KeyboardAvoidingWrapper from '../components/Keyboard';

export default function EditIngredients(props) {

    const windowWidth = Dimensions.get('window').width;

    const [title, setTitle] = useState(props.currentItem.name)
    const [desc, setDesc] = useState(props.currentItem.desc)
    const [protein, setProtein] = useState(props.currentItem.protein)
    const [carb, setCarb] = useState(props.currentItem.carb)
    const [fat, setFat] = useState(props.currentItem.fat)
    const [type, setType] = useState([
        {
            id: 1,
            name: 'Mączki',
            icon: require('../images/flour.png')
        },
        {
            id: 2,
            name: 'Ziarna',
            icon: require('../images/grain.png')
        },
        {
            id: 3,
            name: 'Mixy',
            icon: require('../images/mix.png')
        }
    ])

    const [checkedType, setCheckedType] = useState(props.currentItem.icon == type[0].icon ? 1 : props.currentItem.icon == type[1].icon ? 2 : 3)

    const [packs, setPacks] = useState(props.currentItem.weight)


    const kgs = [packs[0] != 0 ? packs[0].comb : 0, packs.length > 1 ? packs[1].comb : 0, packs.length > 2 ? packs[2].comb : 0]
    const plns = [packs[0] != 0 ? packs[0].price : 0, packs.length > 1 ? packs[1].price : 0, packs.length > 2 ? packs[2].price : 0]

    const addProduct = () => {
        let tempPack = []
        if(kgs[1] == 0){
            tempPack = [
                {
                    id: 1,
                    comb: kgs[0],
                    price: plns[0]
                }
            ]
        }
        else if(kgs[2] == 0){
            tempPack = [
                {
                    id: 1,
                    comb: kgs[0],
                    price: plns[0]
                },
                {
                    id: 2,
                    comb: kgs[1],
                    price: plns[1]
                }
            ]
        }
        else{
            tempPack = [
                {
                    id: 1,
                    comb: kgs[0],
                    price: plns[0]
                },
                {
                    id: 2,
                    comb: kgs[1],
                    price: plns[1]
                },
                {
                    id: 3,
                    comb: kgs[2],
                    price: plns[2]
                }
            ]
        }
        let icon
        type.map( item => {
            if(item.id == checkedType)
                icon = item.icon
        })

        props.stockItems.map( item => {
            if(item.id == props.currentItem.id){
                item.id = props.currentItem.id
                item.name = title,
                item.protein = protein,
                item.fat = fat,
                item.carb = carb,
                item.icon = icon,
                item.weight = tempPack,
                item.desc = desc
            }
        })
        props.storeData(props.stockItems)
        props.getData(); 

        props.navigation.goBack()
    }



    const Item = ({item, index}) => (
            <View style={{width: '100%', height: 50, alignItems: 'center'}}>
                <View style={{width: '90%', height: 50, flexDirection: 'row'}}>
                    <View style={{width: '20%', height: '100%', justifyContent: 'center'}}>
                        <View 
                            style={{width: '50%', height: 40, backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#FFF'}}>{item}</Text>
                        </View>
                    </View>
                    <View style={{width: '40%', height: '100%', justifyContent: 'center'}}>
                        <TextInput
                            placeholder={kgs[index] == 0 ? 'kg' : kgs[index].toString()}
                            placeholderTextColor={'#AAA'}
                            style={{
                                width: '90%',
                                height: 40,
                                borderRadius: 5,
                                padding: 10,
                                backgroundColor: 'rgba(0,0,0,0.25)',
                                color: '#FFF'
                            }}
                            onChangeText={text => {
                                kgs[index] = text
                            }}
                        />
                    </View>
                    <View style={{width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TextInput
                            placeholder={plns[index] == 0 ? 'pln' : plns[index].toString()}
                            placeholderTextColor={'#AAA'}
                            style={{
                                width: '90%',
                                height: 40,
                                borderRadius: 5,
                                padding: 10,
                                backgroundColor: 'rgba(0,0,0,0.25)',
                                color: '#FFF'
                            }}
                            onChangeText={text => {
                                plns[index] = text
                            }}

                        />
                    </View>
                </View>
            </View>
    )

    
  return (
    <KeyboardAvoidingWrapper>
    <View style={{width: '100%', height: 660 , backgroundColor: '#241f36'}}>
        
      <View style={{flex: 1}}>
        <View style={{width: '100%', height: 60, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
                value={title}
                placeholderTextColor={'#AAA'}
                onChangeText={setTitle}
                autoCapitalize='characters'
                style={{
                    width: '90%',
                    height: 40,
                    borderRadius: 5,
                    padding: 10,
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    color: '#FFF'
                }}
            />
        </View>
        <View style={styles.recipies}>
            <View style={styles.line}></View>
            <View style={styles.lineTitle}>
                <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>Typ</Text>
            </View>
        </View>
        <View style={{width: '100%', height: 60, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
                data={type}
                style={{flex: 1, marginTop: 10}}
                renderItem={({ item }) =>(
                        <TouchableOpacity
                            style={[styles.fav_butt, {backgroundColor: item.id === checkedType ? '#f08773' : '#2d2743', width: windowWidth * 0.25}]}
                            onPress={() => setCheckedType(item.id)}
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
        <View style={styles.recipies}>
            <View style={styles.line}></View>
            <View style={styles.lineTitle}>
                <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>Makro</Text>
            </View>
        </View>
        <View style={{width: '100%', height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    value={protein}
                    placeholder={'Białko'}
                    placeholderTextColor={'#AAA'}
                    onChangeText={setProtein}
                    style={{
                        width: '90%',
                        height: 40,
                        borderRadius: 5,
                        padding: 10,
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        color: '#FFF'
                    }}
                    keyboardType={'number-pad'}
                />
            </View>
            <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    value={carb}
                    placeholder={'Węgle'}
                    placeholderTextColor={'#AAA'}
                    onChangeText={setCarb}
                    style={{
                        width: '90%',
                        height: 40,
                        borderRadius: 5,
                        padding: 10,
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        color: '#FFF'
                    }}
                    keyboardType={'number-pad'}
                />
            </View>
            <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    value={fat}
                    placeholder={'Tłuszcze'}
                    placeholderTextColor={'#AAA'}
                    onChangeText={setFat}
                    style={{
                        width: '90%',
                        height: 40,
                        borderRadius: 5,
                        padding: 10,
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        color: '#FFF'
                    }}
                    keyboardType={'number-pad'}
                />
            </View>
        </View>
        <View style={styles.recipies}>
            <View style={styles.line}></View>
            <View style={styles.lineTitle}>
                <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>Opakowania</Text>
            </View>
        </View>
        <View style={{width: '100%', height: 150}}>
            <Item item={1} index={0}/>
            <Item item={2} index={1}/>
            <Item item={3} index={2}/>
        </View>
        <View style={{width: '100%', height: 120, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <TextInput
                value={desc}
                placeholder={'Opis'}
                placeholderTextColor={'#AAA'}
                onChangeText={setDesc}
                style={{
                    width: '90%',
                    height: '100%',
                    borderRadius: 5,
                    padding: 10,
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    color: '#FFF',
                    textAlignVertical: 'top'
                }}
            />
        </View>
        <TouchableOpacity
            style={[styles.addProduct]}
            onPress={() => addProduct()}
        >
            <Text style={{
                color: 'white',
                fontWeight: 'bold'
            }}>EDYTUJ</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingWrapper>
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
    button: {
        borderRadius: 20,
    },
    icon: {
        height: 40,
        width: 40,
        tintColor: '#f08773',
    },
    fav_butt: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
    },
    recipies: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
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
      addProduct: {
        width: '90%',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#28a745',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '5%',
        marginTop: 20
      },
      textInput:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
})