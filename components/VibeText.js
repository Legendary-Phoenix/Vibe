import React, { useState } from 'react';
import { Text } from "react-native";

function VibeText({children,weight="Regular", family="Inter", expand=false, 
    linesNumber=undefined, style,...props}) {
    const [expandState, setExpand]=useState(false);
    const toggleExpand=()=>{
        if (linesNumber!=undefined){
            setExpand(prev => !prev);
        }
    };
    return (
        <Text
        style={[
            {
                fontFamily: `${family}-${weight}`,
                flexWrap:"wrap",
                //fontSize:
            },
            style,
        ]}
        numberOfLines={expandState ? undefined : linesNumber}
        ellipsizeMode={"tail"}
        onPress={expand ? toggleExpand : null}
        {...props}
        >
           {children}
        </Text>
    );
}

export default VibeText;