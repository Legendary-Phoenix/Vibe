import { create } from "zustand";

const usePostStore=create((set)=>({
    post:[],
    nextCursor:1,
    targetPostID:null,

    setPost:(data)=>set({post:data}),
    setNextCursor:(cursor)=>set({nextCursor:cursor}),
    setTargetPostID:(id)=>set({targetPostID:id}),
    clearPostStore:()=>set({postData:[],nextCursor:1})
}))

export default usePostStore;