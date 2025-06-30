import React from 'react';
import { View } from "react-native";

function BreakerLine({marginVertical=10, height=0.5, width="100%"}) {
    return (
        <View style={{
            backgroundColor:"#E1E8ED",
            width,
            height,
            marginVertical}}/>
    );
}

export default BreakerLine;