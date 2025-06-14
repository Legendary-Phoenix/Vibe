import VibeText from "@/components/VibeText.js";
import { StyleSheet, TouchableOpacity } from 'react-native';

function VibeButton({text,style,...props}) {
    return (
        <TouchableOpacity
        style={[styles.button, style]}
        {...props}
        >
            <VibeText weight="SemiBold" style={styles.text}>
                {text}
            </VibeText>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:"#000",
        padding:10,
        borderRadius:5,
        alignSelf:"stretch"
    },
    text:{
        color:"#fff",
        alignSelf:"center", 
        fontSize:13
    }
})
export default VibeButton;