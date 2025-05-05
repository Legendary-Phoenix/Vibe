import React from 'react';
import { View } from "react-native";

function BreakerLine({marginVertical=10, height=0.5}) {
    return (
        <View style={{
            backgroundColor:"#E1E8ED",
            height,
            marginVertical}}/>
    );
}

export default BreakerLine;