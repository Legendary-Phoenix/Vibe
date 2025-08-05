import SafeView from "@/components/SafeView";
import VibeButton from "@/components/VibeButton";
import VibeText from "@/components/VibeText";
import VibeTextInput from "@/components/VibeTextInput";
import supabase from "../../utils/supabase-public.js";

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

function ForgotPassword(props) {
    const [email,setEmail]=useState("");
    const router=useRouter();

    const sendResetEmail=async()=>{
        console.log("Request received");
        console.log("Email:",email)
        try{
            const {error}=await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://vibe-api.up.railway.app/redirect/reset-password',
            });
            if (error){
                Alert.alert("Failed to send reset email. \n",error.message);
                return;
            };
            Alert.alert("Reset email was sent.\nCheck you inbox.");
        } catch (error){
            Alert.alert("Something went wrong");
            console.error(error.message);
        }
    };

    return (
        <SafeView>
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.closeButton}
                onPress={()=>router.push("/auth/auth")}
                >
                    <MaterialIcons
                    name="close"
                    size={24}
                    color="#555"
                    />
                </TouchableOpacity>
                
                <Image
                source={require("../../assets/images/email_confirmation_screen_image.jpg")}
                style={styles.resetPasswordImage}
                />
                <VibeText weight="SemiBold" style={styles.headerText}>
                        Forgot Password
                </VibeText>
                 <VibeText weight="Medium" style={styles.message}>
                        Please enter your email address to {"\n"}
                        reset the password
                </VibeText>
                <VibeTextInput
                style={{marginTop:20, marginBottom:15}}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                />
                <VibeButton
                text="Continue"
                onPress={sendResetEmail}
                />
            </View>
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        paddingVertical:80,
        paddingHorizontal:20
    },
    closeButton:{
        position:"absolute",
        top:20,
        left:30
    },
    resetPasswordImage:{
        width:210,
        height:190
    },
    headerText:{
        fontSize:18,
        marginVertical:20,
        color:"#333"
    },
    message:{
        fontSize:15,
        color:"#555",
        textAlign:"center"
    },
})
export default ForgotPassword;