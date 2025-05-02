import React, { useState } from 'react';
import { Text } from "react-native";

function VibeText({children,weight="Regular", linesNumber=undefined, style,...props}) {
    const [expand, setExpand]=useState(false);
    const toggleExpand=()=>{
        if (linesNumber!=undefined){
            setExpand(prev => !prev);
        }
    };
    return (
        <Text
        style={[
            {
                fontFamily: `ProximaNova-${weight}`,
                flexWrap:"wrap"
            },
            style,
        ]}
        numberOfLines={expand ? undefined : linesNumber}
        ellipsizeMode='tail'
        onPress={toggleExpand}
        {...props}
        >
           {children}
        </Text>
    );
}

export default VibeText;