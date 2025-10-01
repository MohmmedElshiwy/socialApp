import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import PostCard from "./PostCard";

export default function Post({ post }) {
  const { data: u } = useContext(UserContext);
  const currentUser = u?.user;
  console.log(currentUser);
  

  return <PostCard post={post} currentUser={currentUser} />;
}
