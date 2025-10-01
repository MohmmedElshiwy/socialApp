import AddPost from "../../Components/AddPost/AddPost";
import { PostAvatar } from "../../Components/Card/PostAvatar";
import { Card } from "@heroui/react";
import { UserPosts } from "../../Services/posts/Posts";
import Post from "../../Components/Card/Post";
import { useQuery } from "@tanstack/react-query";
import ProfileSkelton from "../../Components/Skeleton/ProfileSkeleton";
import PostSkelton from "../../Components/Skeleton/PostSkelton";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Profile() {
  const { data:u, isPending } = useContext(UserContext);
  const user= u?.user
  
  

  const { data: posts, isPending: isP } = useQuery({
    queryKey: ["posts", user?._id],
    queryFn: () => UserPosts(user._id),
    enabled: !!user?._id,
  });

  const editPoho = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );

  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <div className="flex flex-col  w-full md:w-[80%] lg:w-1/2 gap-6 mt-6">
      {isPending ? (
        <ProfileSkelton />
      ) : (
        <Card
          className="h-96  flex items-center justify-center"
          style={{
            backgroundImage: `url(${user?.photo})`,
            backgroundSize: "100% 100%",
          }}
        >
          <PostAvatar
            createdAt={user?.createdAt}
            name={user?.name}
            photo={user?.photo}
            cssImg={"size-30 rounded-lg"}
            cssText={"text-teal-300 text-2xl font-bold"}
            editPoho={editPoho}
          />
        </Card>
      )}

      <AddPost />

      {isP
        ? Array(5)
            .fill(0)
            .map((_, i) => <PostSkelton key={i} />)
        : posts &&
          [...posts].reverse().map((p) => <Post key={p._id} post={p} />)}
    </div>
  );
}
