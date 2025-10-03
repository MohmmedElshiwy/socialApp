import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../Services/posts/Posts";
import { useEffect, useContext } from "react";
import PostCard from "../../Components/Card/PostCard";
import { UserContext } from "../../Context/UserContext";

export default function PostDetails() {
  const { id } = useParams();
  const { data: u } = useContext(UserContext);
  const currentUser = u?.user;

  useEffect(() => {
    document.title = "Post Details";
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: () => getPostDetails(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="size-full md:size-1/2 lg:size-1/3  mx-auto mt-10">
      <PostCard post={data?.post} currentUser={currentUser}  />
    </div>
  );
}
