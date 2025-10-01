import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllComments } from "../Services/Comments/Comments";

export const CommentsContext = createContext();

export default function CommentsContextProvider({ children ,postId}) {
 const [newComments,setNewComments]   =useState([])

  const { data, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getAllComments(postId),
    enabled: !!postId, // ✅ عشان ميعملش request من غير id
  });
useEffect(()=>{
    if(data?.message){
        setNewComments(data.comments)

    }
},[data])
  return (
    <CommentsContext.Provider value={{ data, isLoading ,newComments,setNewComments }}>
      {children}
    </CommentsContext.Provider>
  );
}
