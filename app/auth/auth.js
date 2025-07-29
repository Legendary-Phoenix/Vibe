import { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Snackbar } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import SafeView from '../../components/SafeView.js';
import VibeText from "../../components/VibeText.js";

import { useRouter } from 'expo-router';
import supabase from "../../utils/supabase-public.js";


function AuthScreen(props) {
    const [isEmailInputFocus, setEmailInputFocused]=useState(false);
    const [isPasswordInputFocus, setPasswordInputFocused]=useState(false);
    const [passwordVisible, setPasswordVisible]=useState(false)
    const [password,setPassword]=useState("");
    const [email, setEmail]=useState("");
    const [loading,setLoading]=useState(false);
    const [signUp, setAuthType]=useState(true);
    const [snackBarVisible, setSnackBarVisible]=useState(false);
    const [snackBarMessage, setSnackBarMessage]=useState("");
    const router=useRouter();

    const authButtonText=signUp ? "Register" : "Log In";
    const authLabel= signUp ? "Already have an account?" : "Don't have an account?";
    const authOptionText=signUp ? "Log in here" : "Sign up here";

    const showSnackBar=(message)=>{
        setSnackBarMessage(message);
        setSnackBarVisible(true);
    }

    const changeAuthType=()=>{
        setEmail("");
        setPassword("");
        setAuthType(prev => !prev);
    }

    const renderForgetPassword=()=>{
        if (signUp){
            return;
        }
        return (
            <TouchableOpacity>
                <VibeText weight="SemiBold" style={styles.forgotText}>
                    Forgot Password?
                </VibeText>
            </TouchableOpacity>
        )
    };

    const handleAuth=async ()=>{
        setLoading(true);
        if (signUp){
            //sign up flow
            const {error}=await supabase.auth.signUp({email,password});
            setLoading(false);
            if (error){
                showSnackBar(`Sign Up Error: ${error.message}`);
                //Alert.alert("Sign Up Error:",error.message);
                return;
            }
            router.push({
                pathname:"/auth/confirm",
                params:{email:email},
            });
            return;
        } else{
            //sgin in flow
            const {error}=await supabase.auth.signInWithPassword({email,password});
            setLoading(false);
            if (error){
                if (error.message.toLowerCase()==="email not confirmed"){
                    router.push({
                        pathname:"/auth/confirm",
                        params:{email:email},
                    });
                    return;
                }
                showSnackBar(`Sign In Error: ${error.message}`);
                //Alert.alert("Sign In Error:",error.message);
                return;
            }
        }
    };

    return (
        <SafeView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                >

                    <View style={styles.container}>
                        <Image
                        source={require("../../assets/images/auth-screen-image.jpg")}
                        style={styles.authImage}
                        />
                        <Image
                        source={require("../../assets/images/vibe.png")}
                        style={styles.vibeImage}
                        />
                        <TextInput
                        style={[styles.input,
                            {
                                borderWidth: isEmailInputFocus ? 2 : 0.6,
                            }]}
                        placeholder="Email Address"
                        placeholderTextColor="#aaa"
                        onFocus={()=>setEmailInputFocused(true)}
                        onBlur={()=>setEmailInputFocused(false)}
                        value={email}
                        onChangeText={setEmail}
                        />
                        <View>
                            <TextInput
                            style={[styles.input,
                                {
                                    borderWidth: isPasswordInputFocus ? 2 : 0.6,
                                }]}
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!passwordVisible}
                            onFocus={()=>setPasswordInputFocused(true)}
                            onBlur={()=>setPasswordInputFocused(false)}
                            value={password}
                            onChangeText={setPassword}
                            />
                            <TouchableOpacity 
                            style={styles.visibleIcon}
                            onPress={()=>setPasswordVisible(prev=>!prev)}
                            >
                                <Ionicons
                                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color={passwordVisible ? "#000" : "gray"}
                                />
                            </TouchableOpacity>
                        </View>
                        {renderForgetPassword()}
                        <TouchableOpacity 
                        style={styles.authButton}
                        onPress={handleAuth}
                        >
                            <VibeText weight="SemiBold" style={{color:"#fff",alignSelf:"center", fontSize:13}}>
                                {authButtonText}
                            </VibeText>
                        </TouchableOpacity>
                        <View style={styles.authOption}>
                            <VibeText weight="Medium" style={{fontSize:12.5}}>
                                {authLabel} {" "}
                            </VibeText>
                            <TouchableOpacity 
                            onPress={()=>{
                            changeAuthType();
                            }}
                            >
                                <VibeText weight="Medium" style={{fontSize:12.5, color:"dodgerblue"}}>
                                    {authOptionText}
                                </VibeText>
                            </TouchableOpacity>
                        </View>
                        {loading && <ActivityIndicator size="large" style={{marginTop:30}}/>}
                        <View style={{ height: 60 }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Snackbar
                visible={snackBarVisible}
                onDismiss={() => setSnackBarVisible(false)}
                duration={2000}
                style={{backgroundColor: "red"}}
            >
                {snackBarMessage}
            </Snackbar>
        </SafeView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        paddingHorizontal:20,
        //justifyContent:"center"
    },
    authImage:{
        width:250,
        height:250,
        alignSelf:"center",
        marginTop:30
        
    },
    vibeImage:{
        width:100,
        height:100,
        alignSelf:"center"
    },
    input:{
        height: 40,
        backgroundColor:"#FAFAFA",
        borderColor:"#ddd",
        borderRadius:5,
        paddingHorizontal:10,
        paddingRight:40,
        marginBottom:15,
        fontSize:13,
        fontFamily:"Inter-Medium"
    },
    visibleIcon:{
        position:"absolute",
        alignSelf:"flex-end",
        top:10,
        right:10
    },
    forgotText:{
        fontSize:11.5,
        color:"#000",
        alignSelf:"flex-end",
        marginBottom:30
    },
    authButton:{
        backgroundColor:"#000",
        padding:10,
        borderRadius:5,
        marginBottom:15
    },
    authOption:{
        flexDirection:"row",
        justifyContent:"center"
    },
})
export default AuthScreen;