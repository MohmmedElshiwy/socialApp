import { Button, Input } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { CreateComment } from '../../Services/Comments/Comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentsContext } from '../../Context/CommentsContext';
import toast from 'react-hot-toast';

export default function Comment({  postId }) {
  const [headin, setHeadin] = useState(false);
  const [like, setLike] = useState(0);
  const [active, setAcvtive] = useState(false);
  const [commentText, setCommentText] = useState("");
  const {newComments}=useContext(CommentsContext)
  
  

  const queryClient = useQueryClient();

  // mutation لإضافة كومنت
  const { mutate, isPending } = useMutation({
    mutationFn: () => CreateComment(commentText, postId),
    onSuccess: () => {
      // إعادة جلب الكومنتس
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment Added Succfuly")
      setCommentText("");
      
    },
    onError: (err) => {
      console.error("❌ Failed to add comment:", err);
    }
  });
  

  function showAddComment() {
    setHeadin(!headin);
  }

  function addLike() {
    if (!active) {
      setLike(like + 1);
    } else {
      setLike(like - 1);
    }
    setAcvtive(!active);
  }

  function Submit(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    mutate(); // استدعاء الـ mutation
  }

  return (
    <>
      <div className="border-t-1 p-6 text-2xl flex justify-between mt-5">
        <div className="text-2xl flex gap-3 items-center">
          <i
            onClick={addLike}
            className={`fa-solid fa-thumbs-up cursor-pointer ${
              active ? "text-blue-600" : ""
            }`}
          ></i>
          <span>{like}</span>
        </div>
        <i
          onClick={showAddComment}
          className="fa-regular fa-comment cursor-pointer"
        ></i>
        {newComments.length}
      </div>

      {headin && (
        <form onSubmit={Submit} className="gap-3 flex px-6 my-6 w-full">
          <div className="flex w-full relative items-center text-2xl">
            {/* input بتاع الكومنت */}
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
          </div>

          <Button
            isLoading={isPending}
            disabled={commentText.trim().length === 0}
            color="primary"
            type="submit"
          >
            Add Comment
          </Button>
        </form>
      )}
    </>
  );
}
