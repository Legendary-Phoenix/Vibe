import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import PostFeed from "./PostFeed";

function ReelsTab() {
  const [accountID, setAccountID]=useState(null);
  const [loading, setLoading]=useState(true);
  const fetchAccountID=async()=>{
    const accountID=await SecureStore.getItemAsync("accountID");
    setAccountID(accountID);
    setLoading(false);
  }
  useEffect(()=>{
    fetchAccountID();
  },[]);
  if (loading){
    return;
  }
  return (
    <View style={{ flex: 1, backgroundColor:"#fff", paddingVertical:2}}>
      <PostFeed 
      postType="Reel" 
      ownerAccountID={accountID} 
      thumbnailView={true}/>
    </View>
  );
}

export default ReelsTab;