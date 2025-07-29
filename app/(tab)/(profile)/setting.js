import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SafeView from '../../../components/SafeView';
import VibeText from '../../../components/VibeText';
import supabase from "../../../utils/supabase-public";

function Setting(props) {
    const router=useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            //
        }
    };

    return (
        <SafeView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={()=>router.back()}
                >
                    <MaterialIcons
                    name="keyboard-backspace"
                    size={30}
                    color="#000"
                    />
                </TouchableOpacity>
                <VibeText weight="SemiBold" style={{fontSize:18, marginHorizontal:30}}>
                    Settings
                </VibeText>
            </View>
            <TouchableOpacity
            style={styles.logout}
            onPress={handleLogout}
            >
                <MaterialIcons
                name="logout"
                size={24}
                color="red"
                />
                <VibeText weight="Regular" style={styles.logoutText}>
                    Log Out
                </VibeText>
            </TouchableOpacity>
       </SafeView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        flexDirection:"row",
        marginHorizontal:15,
        marginTop:15,
        alignItems:"center"
    },
    logout:{
        flexDirection:"row",
        marginLeft:15,
        marginVertical:20
    },
    logoutText:{
        fontSize: 16,
        color:"red",
        marginLeft:15
    }
})
export default Setting;