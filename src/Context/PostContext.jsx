import { createContext, useState } from "react";
import { getAllPosts } from "../Services/posts/Posts";
import { useQuery } from "@tanstack/react-query";

export const PostContext=createContext()
export function PostContextProvider({children})
{


const [page, setPage] = useState(1); // ✅ تعريف الصفحة الحالية

  const { data, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getAllPosts(page, 10),
    keepPreviousData: true,
  });

    return(

        <PostContext.Provider value={{data,isLoading,page,setPage}}>
            {children}
        </PostContext.Provider>
    )

}