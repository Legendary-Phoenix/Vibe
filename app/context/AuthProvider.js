import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../utils/supabase-public.js";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [sessionAvailable,setSessionStatus]=useState(false);
    const [sessionLoading,setSessionLoading]=useState(true);
    const router=useRouter();

    const checkSession=async()=>{
        try{
            const {data:{session},error}=await supabase.auth.getSession();
    
            if(error){
                console.error("Error checking session:",error);
                setSessionStatus(false);
                setSessionLoading(false);
                return;
            }
            if (session?.user){
                
                console.log("Session found");
                setSessionStatus(true);
                await SecureStore.setItemAsync("accessToken",session.access_token);
                await SecureStore.setItemAsync("refreshToken",session.refresh_token);
                await SecureStore.setItemAsync("accountID",session.user.id);
                console.log("Session restored and tokens saved");
            } else{
                setSessionStatus(false);
            }
        } catch (error) {
            console.error("Error in checkSession",error);
            setSessionStatus(false);
        } finally {
            setSessionLoading(false);
        }
    };

    useEffect(()=>{
        let authListener;

        const init=async()=>{
            //for dev
            //await supabase.auth.signOut();

            await checkSession();

            const {data: listener}=supabase.auth.onAuthStateChange(
                async (event,session)=>{
                    console.log("Auth state changed",event);
                    if (event==="SIGNED_IN"&&session?.user){
                        setSessionStatus(true);
                        await SecureStore.setItemAsync("accessToken",session.access_token);
                        await SecureStore.setItemAsync("refreshToken",session.refresh_token);
                        await SecureStore.setItemAsync("accountID",session.user.id);
                        console.log("Tokens saved after sign in");
                        router.replace("/(tab)/home");
                    } 

                    if (event==="SIGNED_OUT"){
                        setSessionStatus(false);
                        await SecureStore.deleteItemAsync("accessToken");
                        await SecureStore.deleteItemAsync("refreshToken");
                        await SecureStore.deleteItemAsync("accountID");
                        router.replace("/auth/auth");
                    }

                    if (event==="TOKEN_REFRESHED"&&session){
                        await SecureStore.setItemAsync("accessToken",session.access_token);
                        await SecureStore.setItemAsync("refreshToken",session.refresh_token);
                        console.log("Tokens refreshed and updated");
                    }
                }
            );
            authListener=listener;
        };
        init();
        return ()=>{
            if (authListener?.subscription){
                authListener.subscription.unsubscribe();
            }
        };
    },[]);

    return (
        <AuthContext.Provider value={{sessionAvailable,setSessionStatus,sessionLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>useContext(AuthContext);