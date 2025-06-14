import api from "./axios.js";

const fetchData=async ({route,success,error})=>{
    try{
        const response=await api.get(route);
        success();
        return {data:response,error:null};
    } catch (fetchError){
        error();
        return {data:null,fetchError};
    }
};

const postData=async({route,body,success,error})=>{
    try{
        const response=await api.post(route,body);
        success();
        return {data:response,error:null}
    } catch (postError){
        error();
        return {data:null,error:postError}
    }
}