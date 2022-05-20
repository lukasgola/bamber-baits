import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Home from '../screens/Home'
import AddNote from '../screens/AddNote'
import Busket from '../screens/Busket';
import Stock from '../screens/Stock';
import Store from '../screens/Store';
import Photos from '../screens/Photos';
import Camera from '../screens/Camera';
import ImageScreen from '../screens/ImageScreen';
import Notes from '../screens/Notes';

import Recipe from '../screens/Recipe'
import MainStock from '../screens/MainStock'
import OwnIngredient from '../screens/OwnIngredients'
import AddIngredient from '../screens/AddIngredient'
import Conclusion from '../screens/Conclusion';
import ListIngredients from '../screens/ListIngredients'
import EditIngredients from '../screens/EditIngredients'
import EditMain from '../screens/EditMain'
import ItemSettings from '../screens/ItemSettings'


const StackNavigator = createStackNavigator({
Home: {
    screen: Home
},
AddNote:{
    screen: AddNote
},
Busket:{
    screen: Busket
},
Stock:{
    screen: Stock
},
Store:{
    screen: Store
},
Photos:{
    screen: Photos
},
Camera:{
    screen: Camera
},
ImageScreen:{
    screen: ImageScreen
},
Recipe:{
    screen: Recipe
},
MainStock:{
    screen: MainStock
},
OwnIngredient:{
    screen: OwnIngredient
},
AddIngredient:{
    screen: AddIngredient
},
Conclusion:{
    screen: Conclusion
},
ListIngredients:{
    screen: ListIngredients
},
Notes:{
    screen: Notes
},
EditIngredients:{
    screen: EditIngredients
},
EditMain:{
    screen: EditMain
},
ItemSettings:{
    screen: ItemSettings
},
},
{
    initialRouteName: 'Home',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)


