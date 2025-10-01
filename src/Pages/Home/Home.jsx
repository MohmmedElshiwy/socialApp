import { useContext, useEffect } from 'react';
import Post from '../../Components/Card/Post';
import PostSkelton from '../../Components/Skeleton/PostSkelton';
import { PostContext } from '../../Context/PostContext';
import AddPost from '../../Components/AddPost/AddPost';

export default function Home() {
  
const {data,isLoading,page,setPage}=useContext(PostContext)
// console.log(data);
useEffect(()=>{
  document.title="Home Page"
},[])

  
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="pt-20 flex flex-col items-center gap-4 max-w-3xl w-full">
      <AddPost/>
        {isLoading
          ? Array(5).fill(0).map((_, i) => <PostSkelton key={i} />)
          : data?.posts?.map((post) => <Post key={post._id} post={post} />)
        }
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-around items-center mt-4 w-full ">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="px-3 py-1 bg-blue-400 cursor-pointer hover:bg-blue-600 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          disabled={!data?.posts?.length || data.posts.length < 5}
          onClick={() => setPage((old) => old + 1)}
          className="px-3 py-1 bg-blue-400 cursor-pointer hover:bg-blue-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
