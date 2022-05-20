import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Test from '../screens/Test'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Test' component={Test} />
        </Tab.Navigator>
    )
}

export default Tabs;