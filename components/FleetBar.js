import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import avatar from "../logic/avatar.js";

function FleetBar() {
    return (
        <ScrollView 
        horizontal={true}
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
            {justifyContent:"space-evenly", alignItems:"flex-start", 
            paddingLeft:10, paddingRight:20
            }}>
            {
                Object.values(avatar).map(avatar=>(
                    <View style={styles.fleetContainer}>
                        <TouchableOpacity>
                        <View style={styles.fleet}>
                            <Image
                            style={styles.fleetProfilePic}
                            source={avatar}
                            />
                        </View>
                        </TouchableOpacity>
                    </View>
                        
            ))};
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    carousel:{
        paddingVertical:5,
    },
    fleetContainer:{
        width:80,
        alignItems:"center",
    },
    fleet:{
        borderRadius:50,
        borderWidth:3,
        borderColor:"dodgerblue",
        padding:1.5,
    },
    fleetProfilePic:{
        width:60,
        height:60,
        borderRadius:50,
    }
})

export default FleetBar;