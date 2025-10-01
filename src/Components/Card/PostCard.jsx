import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { PostAvatar } from "./PostAvatar";
import PostBody from "./PostBody";
import Comment from "./Comment";
import CommentsContextProvider, { CommentsContext } from "../../Context/CommentsContext";
import DropDown from "../DropDown";
import PostFooter from "./PostFooter";
import { DeletePost } from "../../Services/posts/Posts";
export default function PostCard({ post, currentUser }) {
  if (!post) return null;

  const { body, _id, user: postUser, createdAt, image, comments = [] } = post;
  const { name, photo, _id: postUserId } = postUser || {};
  

  return (
    <CommentsContextProvider postId={_id}>
      <Card className="w-full my-2 shadow shadow-blue-300 relative">
        {/* Header */}
        <PostAvatar name={name} photo={photo} createdAt={createdAt} />
        
{currentUser?._id === postUserId && (
            <span className="cursor-pointer w-fit bg-gray-300 rounded-bl-lg absolute z-10 end-0">
              <DropDown
                id={_id}
                deleteFn={DeletePost}
                queryKey="posts"
                successMsg="Post deleted successfully ✅"
                errorMsg="Failed to delete post ❌"
              />
            </span>
          )}

        {/* Body */}
            <PostBody body={body} image={image} name={name} id={_id} />
       


            <Comment commentLength={comments.length} postId={_id} />
        {/* Comments */}
        <PostFooter  postUserId={postUserId} currentUser={currentUser}  postId={_id} />
      </Card>
    </CommentsContextProvider>
  );
}
