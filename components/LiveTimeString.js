import VibeText from "@/components/VibeText.js";
import { useEffect, useState } from 'react';

function LiveTimeString({timestamp, style}) {
    const [timeString,setTimeString]=useState("");

    const formatTimeStamp=()=>{
        const now=new Date();
        const postDate=new Date(timestamp);
        const diffInMs=now-postDate;
        const diffInMinutes=Math.floor(diffInMs/60000);
        const diffInHours=Math.floor(diffInMinutes/60);
        const diffInDays=Math.floor(diffInHours/24);
        
        let yearsDiff = now.getFullYear() - postDate.getFullYear();

        const timeAdjusted = new Date(now.getFullYear(), postDate.getMonth(), postDate.getDate());
        if (timeAdjusted > now) {
            yearsDiff--;
        }

        if (diffInMinutes < 60){
            return `${Math.max(diffInMinutes,1)}m`;
        } else if (diffInMinutes >=60 && diffInHours < 24){
            return `${diffInHours}h`;
        } else if (diffInDays <7){
            return `${diffInDays}d`;
        } else if (diffInDays>=7 && yearsDiff <1){
            const options={month:"long",day:"numeric"};
            return postDate.toLocaleDateString("en-US",options);
        } else {
            const options={month:"long",day:"numeric", year:"numeric"};
            return postDate.toLocaleDateString("en-US",options);
        }
    };

    useEffect(()=>{
        const formattedPostDate=formatTimeStamp();
        setTimeString(formattedPostDate);

        const interval=setInterval(()=>{
            const formattedPostDate=formatTimeStamp();
            setTimeString(formattedPostDate);
        },1000*60);
        return () => {
            clearInterval(interval);
        }
    },[])
    return (
        <VibeText weight="Medium" style={style}>
            {timeString}
        </VibeText>
    );
}

export default LiveTimeString;