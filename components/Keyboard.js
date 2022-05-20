import React from "react";


import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, DevSettings } from "react-native";

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingWrapper