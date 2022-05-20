import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#241f36'
    },
    menu: {
      width: '100%',
      height: '10%',
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    menu_icon: {
      width: '20%',
      height: '100%',
      justifyContent: 'center'
    },
    menu_title: {
      width: '60%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    suma:{
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      backgroundColor: '#2d2743'
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
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
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
      paddingLeft: '5%',
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
      width: '45%',
      height: '70%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
  },
  modal_agree: {
      width: '45%',
      height: '70%',
      borderRadius: 10,
      backgroundColor: '#28a745',
      alignItems: 'center',
      justifyContent: 'center',
  },
  flatlist_type: {
      width: '100%',
      height: 70,
  },
  flatlist_type_butt: {
      paddingHorizontal: 20,
      marginHorizontal: 10,
      marginTop: 15,
      justifyContent: 'center',
      height: 40,
      borderRadius: 10,
  }
});
