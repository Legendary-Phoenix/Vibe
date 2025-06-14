import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

function VibeTextInput({style,...props}) {
    const [inputFocused,setInputFocused]=useState(false);
    return (
        <TextInput
        style={[styles.input, {borderWidth:inputFocused ? 2 : 0.6}, style]}
        onFocus={()=>setInputFocused(true)}
        onBlur={()=>setInputFocused(false)}
        placeholderTextColor="#aaa"
        {...props}
        />
    );
}
const styles = StyleSheet.create({
    input:{
        height:40,
        backgroundColor:"#FAFAFA",
        borderColor:"#ddd",
        borderRadius:5,
        paddingHorizontal:10,
        fontSize:13,
        fontFamily:"Inter-Medium",
        alignSelf:"stretch",
    }
})
export default VibeTextInput;