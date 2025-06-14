import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

function Fleet({size, imagePath, storyAvailable, watched, borderWidth=2}) {
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

        return {
            borderRadius: 50,
            borderColor: watchStatus ? "#C0C0C0" : "dodgerblue",
            borderWidth,
            padding:1.5
        };
    };

    return (
        <TouchableOpacity 
        onPress={updateWatchStatus}
        style={[{
            width: size+10,
            height: size+10,
            alignItems:"center",
            justifyContent: "center",
        },
        borderStyle()
        ]}>
            <Image
            source={imagePath}
            style={{width: size,height: size,borderRadius:50}}
            />
        </TouchableOpacity>
    );
}

export default Fleet;