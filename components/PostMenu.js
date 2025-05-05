import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import BreakerLine from "./BreakerLine.js";
import VibeText from "./VibeText.js";

function PostMenu(props) {
    return (
        <>
            <View style={styles.bottomSheetHeader}>

                <View style={styles.sheetHButtonContainer}>
                    <TouchableOpacity style={styles.sheetHeaderButtons}>
                        <FontAwesome
                            name="bookmark-o"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                    <VibeText weight="Medium" style={styles.headerButtonText}>
                        Save
                    </VibeText>
                </View>
                
                <View style={styles.sheetHButtonContainer}>
                    <TouchableOpacity style={styles.sheetHeaderButtons}>
                        <MaterialCommunityIcons
                            name="qrcode-scan"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                    <VibeText weight="Medium" style={styles.headerButtonText}>
                        QR Code
                    </VibeText>
                </View>

            </View>

            <BreakerLine/>

            <View style={styles.bottomSheetBody}>

                <TouchableOpacity style={styles.bottomSheetOptions}>

                    <MaterialCommunityIcons
                    name="information-outline"
                    size={28}
                    color="#000"
                    />
                    <VibeText weight="Regular" style={styles.optionsText}>
                        More information on post
                    </VibeText>

                </TouchableOpacity>
                
                <TouchableOpacity style={styles.bottomSheetOptions}>

                    <MaterialCommunityIcons
                    name="eye-off-outline"
                    size={28}
                    color="#000"
                    />
                    <VibeText weight="Regular" style={styles.optionsText}>
                        Not interested
                    </VibeText>

                </TouchableOpacity>
                
                <TouchableOpacity style={styles.bottomSheetOptions}>

                    <MaterialCommunityIcons
                    name="comment-alert-outline"
                    size={28}
                    color="red"
                    />
                    <VibeText weight="Regular" style={[styles.optionsText,{color:"red"}]}>
                        Report
                    </VibeText>

                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomSheetOptions}>

                    <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={28}
                    color="#000"
                    />
                    <VibeText weight="Regular" style={styles.optionsText}>
                        About this account
                    </VibeText>
                </TouchableOpacity>
                        
            </View>
            
        </>

    );
}
 const styles = StyleSheet.create({
    bottomSheetHeader:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginVertical:10,
    },
    sheetHButtonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    sheetHeaderButtons:{
        width:50,
        height: 50,
        borderRadius:50,
        borderWidth:0.8,
        //#4B4B4B
        //borderColor: "#C0C0C0",
        //#363636
        borderColor:"#262626",
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:5
    },
    headerButtonText:{
        fontSize:13,
        color:"#363636"
    },
    bottomSheetBody:{
        marginHorizontal:20,
        justifyContent:"center"
    },
    bottomSheetOptions:{
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:10,
        //justifyContent:"center"
    },
    optionsText:{
        fontSize:14.5,
        color:"#000",
        marginHorizontal:15,
    }
 })
export default PostMenu;