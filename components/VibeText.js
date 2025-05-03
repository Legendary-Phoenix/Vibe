import React, { useState } from 'react';
import { Text } from "react-native";

function VibeText({children,weight="Regular", family="Inter", linesNumber=undefined, style,...props}) {
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
                fontFamily: `${family}-${weight}`,
                flexWrap:"wrap",
                //fontSize:
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