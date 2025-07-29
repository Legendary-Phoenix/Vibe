import usePostStore from '@/store/postStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PostFeed from "../../../components/PostFeed";
import SafeView from '../../../components/SafeView';
import VibeText from '../../../components/VibeText';

function ProfileFeed() {
    const [accountID, setAccountID]=useState(null);
    const [loading, setLoading]=useState(true);
    const [post, setPost]=useState(usePostStore(state => state.post));
    const nextCursor=usePostStore(state => state.nextCursor);
    const targetPostID = usePostStore(state => state.targetPostID);
    const router=useRouter();

    const shiftPostToTop=(()=>{
        const index=post.findIndex(p=>p.postid===targetPostID);
        const targetPost=post[index];
        const newPosts=[...post];
        newPosts.splice(index,1);
        newPosts.unshift(targetPost);
        return newPosts;
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            const accountID = await SecureStore.getItemAsync("accountID");
            setAccountID(accountID);
            setPost(shiftPostToTop());
            setLoading(false);
        };

        fetchAndSet();
    }, []);


    if (loading) return;
    
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
                    Posts
                </VibeText>
            </View>
            <PostFeed
            initialPost={post}
            initialNextCursor={nextCursor}
            ownerAccountID={accountID}
            />
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
    }
})
export default ProfileFeed;