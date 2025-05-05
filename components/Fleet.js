import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

function Fleet({size, imageUri, storyAvailable, watched,
    watchBorder=true, borderWidth=2, borderColor="dodgerblue", 
    borderRatio=8,
    }) {
    const [watchStatus, setWatchStatus]=useState(watched);
    const updateWatchStatus = () => {
        if (!watchStatus) {
          setWatchStatus(true);
        }
      }
    const borderStyle= () => {
        if (!storyAvailable){
            return {};
        }

        if (watchStatus && !watchBorder){
            return {};
        }

        return {
            borderRadius: 50,
            borderColor: watchStatus ? "#C0C0C0" : borderColor,
            borderWidth,
            padding:1.5
        };
    };

    return (
        <TouchableOpacity 
        onPress={updateWatchStatus}
        style={[{
            width: size+borderRatio,
            height: size+borderRatio,
            alignItems:"center",
            justifyContent: "center",
        },
        borderStyle()
        ]}>
            <Image
            source={imageUri}
            style={{width: size,height: size,borderRadius:50}}
            />
        </TouchableOpacity>
    );
}

export default Fleet;