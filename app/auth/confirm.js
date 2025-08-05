import SafeView from "@/components/SafeView";
import VibeText from "@/components/VibeText";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Snackbar } from 'react-native-paper';

import { supabase } from "../../utils/supabase-public.js";

function ConfirmationScreen() {
    const router=useRouter();
    const {email="user20@example.com"}=useLocalSearchParams();
    const [snackBarVisible, setSnackBarVisible]=useState(false);
    const [snackBarMessage, setSnackBarMessage]=useState("");
    const [snackBarColor, setSnackBarColor]=useState("red");

    const showSnackBar=(message,color="red")=>{
        setSnackBarMessage(message);
        setSnackBarVisible(true);
        setSnackBarColor(color);
    }

    const resendEmail=async ()=>{
        const {error}=await supabase.auth.resend({
            type:"signup",
            email
        });
        if (error){
            showSnackBar(`Failed to resend email.`);
            return;
        }
        showSnackBar(`Confirmation email sent.`,"green");
    }
    
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
                <View style={styles.body}>
                    <Image
                    source={require("../../assets/images/email_confirmation_screen_image.jpg")}
                    style={styles.confirmImage}
                    />
                    <VibeText weight="SemiBold" style={styles.headerText}>
                        Confirm your email address
                    </VibeText>
                    <VibeText weight="Medium" style={styles.message}>
                    We sent a confirmation email to:
                    </VibeText>
                    <VibeText weight="Bold" style={styles.message}>
                    {email}
                    </VibeText>
                    <VibeText weight="Medium" style={styles.message}>
                    Check your email and click on the
                    confirmation link to continue.
                    </VibeText>

                    <TouchableOpacity
                    style={styles.resendButton}
                    onPress={resendEmail}
                    >
                        <VibeText weight="SemiBold" style={styles.resendText}>
                            Resend Email
                        </VibeText>
                    </TouchableOpacity>
                </View>
                <Snackbar
                    visible={snackBarVisible}
                    onDismiss={() => setSnackBarVisible(false)}
                    duration={2000}
                    style={{backgroundColor: snackBarColor}}
                >
                    {snackBarMessage}
                </Snackbar>
            </View>
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    closeButton:{
        marginHorizontal:20,
        marginVertical:30,
    },
    body:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:210,
        paddingHorizontal:50
    },
    confirmImage:{
        width:220,
        height:220,
    },
    headerText:{
        fontSize:18,
        marginVertical:20,
        color:"#333",
    },
    message:{
        fontSize:15,
        marginVertical:4,
        color:"#555",
        textAlign:"center",
        lineHeight:26
    },
    resendButton:{
        //width:250,
        borderRadius:5,
        backgroundColor:"#000",
        padding:10,
        marginVertical:20,
        alignSelf:"stretch"
       
    },
    resendText:{
        color:"#fff",
        fontSize:14,
        textAlign:"center"
    }
})

export default ConfirmationScreen;