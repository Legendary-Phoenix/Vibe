import React from 'react';
import { ScrollView, View } from "react-native";

import avatar from "../logic/avatar.js";
import FleetLegacy from "./FleetLegacy.js";

function FleetBar() {
    return (
        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
            {justifyContent:"space-evenly", alignItems:"flex-start", 
            paddingLeft:15, paddingRight:5
            }}>
            {
                Object.values(avatar).map(avatar=>(
                    <View style={{marginRight:10}}>
                        <FleetLegacy
                        size={60}
                        imagePath={avatar}
                        storyAvailable={true}
                        watched={false}
                        watchBorder={true}
                        borderWidth={3}
                        borderRatio={10}
                        />
                    </View>
                                         
            ))};
        </ScrollView>
    );
}

export default FleetBar;