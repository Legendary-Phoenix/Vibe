import React from 'react';
import { Text } from "react-native";

function VibeText({children,font="ProximaNova-Regular", style,...props}) {
    return (
        <Text
        style={[
            {
                fontFamily: font,
            },
            style,
        ]}
        {...props}
        >
           {children}
        </Text>
    );
}

export default VibeText;