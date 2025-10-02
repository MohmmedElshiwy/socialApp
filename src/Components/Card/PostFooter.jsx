import { CardFooter, Input, Button } from "@heroui/react";
import { useContext, useState } from "react";
import { CommentsContext } from "../../Context/CommentsContext";
import { PostAvatar } from "./PostAvatar";
import DropDown from "../DropDown";
import { CreateComment, EditComment, DeleteComment } from "../../Services/Comments/Comments";

export default function PostFooter({ currentUser, postUserId }) {
  const { newComments, setNewComments, isLoading } = useContext(CommentsContext);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [Loading,setLoading]=useState(false)


  // دالة تعديل كومنت موجود
  async function submitEdit(e) {
    e.preventDefault();
    setLoading(true)
    if (!editContent.trim()) return;

    await EditComment(editingId, editContent);
    setNewComments(prev =>
      prev.map(c => (c._id === editingId ? { ...c, content: editContent } : c))
    );
    setEditingId(null);
    setEditContent("");
    setLoading(false)
  }

  if (isLoading) return <CardFooter>Loading comments...</CardFooter>;

  return (
    <CardFooter className="flex flex-col gap-3 w-full mt-4 bg-zinc-100 p-3 rounded-lg">
      {/* عرض الكومنتات */}
      {newComments.length ? (
        newComments.slice(0, 3).map(c => (
          <div key={c._id} className="flex flex-col w-full relative">
            <PostAvatar
              name={c.commentCreator?.name}
              photo={c.commentCreator?.photo}
              createdAt={c.createdAt}
            />

            {/* Dropdown للحذف والتعديل */}
            {(currentUser?._id === postUserId || currentUser?._id === c.commentCreator._id) && (
              <span className="cursor-pointer w-fit bg-gray-300 rounded-bl-lg absolute z-10 end-0">
                <DropDown
                  deleteFn={() => DeleteComment(c._id)}
                  editFn={() => {
                    setEditingId(c._id);
                    setEditContent(c.content);
                  }}
                   queryKey={"comments"}

                />
              </span>
            )}

            {/* وضعية التعديل */}
            {editingId === c._id ? (
              <form onSubmit={submitEdit} className="flex gap-2 mt-2 w-full">
                <Input
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  placeholder="Edit comment..."
                  className="flex-1"
                />
                <Button isLoading={Loading} type="submit" color="primary">Save</Button>
                <Button onClick={() => setEditingId(null)}>Cancel</Button>
              </form>
            ) : (
              <h4 className="text-small text-start ps-20">{c.content}</h4>
            )}
          </div>
        ))
      ) : (
        <p className="text-small text-default-400">No comments yet</p>
      )}

      {/* إضافة كومنت جديد */}
    
    </CardFooter>
  );
}
