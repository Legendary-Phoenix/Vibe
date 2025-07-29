import api from "@/utils/axios.js";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";

import Fleet from "@/components/Fleet.js";
import VibeText from "@/components/VibeText.js";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ProfileTabs from "../../../components/ProfileTabs.js";
import SafeView from "../../../components/SafeView.js";

function Profile() {
    const [profileData,setProfileData]=useState(null);
    const [loading, setLoading]=useState(false);
    const [index, setIndex] = useState(0);
    const router=useRouter();
   

    const fetchProfile=async ()=>{
        if (profileData) return;
        console.log("This function is called"); //debug
        setLoading(true);

        try{
            const accountID=await SecureStore.getItemAsync("accountID");
            const response=await api.get(`/profile?accountID=${accountID}`);

            setProfileData(response.data.data[0])
        } catch (error){
            if (error.response?.data?.errorMessage) {
                console.error("Error fetching profile data:", error.response?.data?.errorMessage);
            } else {
                console.error("Network or unknown error:", error.message || error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchProfile();
    },[]);

    const renderProfilePage=()=>{
        return(
            <View>
                <View style={styles.header}>
                    <VibeText weight="SemiBold" style={{fontSize:18}}>
                        {profileData.username}
                    </VibeText>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={{marginHorizontal:20}}>
                            <FontAwesome
                            name="plus-square-o"
                            color="#000"
                            size={27}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>router.push('(tab)/(profile)/setting')}>
                            <Ionicons
                            name="menu-sharp"
                            color="#000"
                            size={28}
                            />
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.leftCard}>
                        <Fleet
                        size={68}
                        imagePath={profileData.fleet.avatarpath}
                        storyAvailable={profileData.fleet.isstoryavailable}
                        watched={profileData.fleet.iswatched}
                        borderWidth={3}
                        />
                    </View>

                    <View style={styles.rightCard}>
                        <VibeText weight="Medium" style={{fontSize:14, color:"#000", }}>
                        {profileData.displayname}
                        </VibeText>
                        <View style={styles.metricContainer}>

                            <View style={styles.metric}>
                                <VibeText weight="SemiBold" style={styles.topText}>
                                    {profileData.numberofposts}
                                </VibeText>
                                <VibeText weight="Regular" style={styles.bottomText}>
                                    posts
                                </VibeText>
                            </View>

                            <View style={styles.metric}>
                                <VibeText weight="SemiBold" style={styles.topText}>
                                    {profileData.numberoffollowers}
                                </VibeText>
                                <VibeText weight="Regular" style={styles.bottomText}>
                                    followers
                                </VibeText>
                            </View>

                            <View style={styles.metric}>
                                <VibeText weight="SemiBold" style={styles.topText}>
                                    {profileData.numberoffollowing}
                                </VibeText>
                                <VibeText weight="Regular" style={styles.bottomText}>
                                    following
                                </VibeText>
                            </View>

                        </View>
                    </View>
                    
                </View>

                <View style={{paddingHorizontal:20}}>
                    <VibeText weight="Regular" style={{fontSize:13,color:"#4A4A4A",lineHeight:18,}}>
                        {profileData.profiledescription}
                    </VibeText>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <VibeText weight="SemiBold" style={{fontSize:13,color:"#fff",textAlign:"center"}}>
                            Edit profile
                        </VibeText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor:"#000"}]}>
                        <VibeText weight="SemiBold" style={{fontSize:13,color:"#fff",textAlign:"center"}}>
                            Share profile
                        </VibeText>
                    </TouchableOpacity>
                </View>

            </View>
        );
    };

    
    return (
        <SafeView style={styles.container}>
            {loading ? (
                // Show activity indicator while loading
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : profileData ? (
                // Show profile page content once loaded and profileData is available
                <>
                    {renderProfilePage()}
                    <ProfileTabs />
                </>
            ) : (
                <View style={styles.errorContainer}>
                    <VibeText weight="SemiBold" style={{ fontSize: 16, color: "#999" }}>
                    Failed to load profile.
                    </VibeText>
                </View>
            )}
        </SafeView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    header:{
        marginHorizontal:15,
        marginVertical:15,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    iconContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    profileCard:{
        flexDirection:"row",
        marginTop:10,
        marginBottom:20
    },
    leftCard:{
        marginHorizontal:20
    },
    profileIcon:{
        marginHorizontal:15
    },
    rightCard:{
        marginHorizontal:5,
        marginTop:10
        // alignItems:"center"
    },
  
    metricContainer:{
        flexDirection:"row",
        marginTop:5,
        justifyContent:"space-evenly"
    },
    metric:{
        marginRight:20
    },
    topText:{
        fontSize:15,
        
    },
    bottomText:{
        fontSize:13,
        color:"#2A2A2A",
    },
    buttonContainer:{
        flexDirection:"row",
        marginHorizontal:15,
        marginTop:15,
        marginBottom:20
    },
    button:{
        width:170,
        marginRight:10,
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:7,
        backgroundColor:"#000"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
export default Profile;