import { Button, Image, Input } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../../Services/posts/Posts";
import toast from "react-hot-toast";

export default function AddPost() {
  const queryClient = useQueryClient(); // ✅ استدعاء الـ client

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setimgUrl] = useState("");

  async function Createpost(e) {
    e.preventDefault();
    const formData = new FormData();
if(body.trim()){
    formData.append("body",body)
}
    if (image) {
      formData.append("image", image);
    }
       if (!body.trim() && !image) {
      toast("You should writhe or uplode someThing👀");
      return;
    }
    mutate(formData);
    toast.success("Post Added Successfuly")

    // Reset form بعد الإرسال
    setBody("");
    setImage(null);
    setimgUrl("");
  }

  function handelImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setimgUrl(URL.createObjectURL(file));
    e.target.value = "";
  }

  return (
    <form onSubmit={Createpost} className="w-full bg-gray-100 rounded-2xl p-3">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write something..."
        rows={4}
        className="border w-full rounded-2xl p-4 resize-none bg-white"
      />

      {imgUrl && (
        <div className="relative my-6">
          <Image src={imgUrl} alt="preview" />

          <span
            onClick={() => {
              setimgUrl("");
              setImage(null);
            }}
            className="absolute bg-red-400 cursor-pointer top-1.5 end-1.5 z-10 rounded-lg"
          >
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      )}

      <div className="flex justify-between py-3">
        <label>
          <Input
            onChange={handelImage}
            type="file"
            accept="image/*"
            className="hidden"
          />
          <span className="cursor-pointer hover:text-blue-500">
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
                d="m2.25 15.75 5.159-5.159a2.25 
                   2.25 0 0 1 3.182 0l5.159 
                   5.159m-1.5-1.5 1.409-1.409a2.25 
                   2.25 0 0 1 3.182 0l2.909 
                   2.909m-18 3.75h16.5a1.5 1.5 
                   0 0 0 1.5-1.5V6a1.5 1.5 
                   0 0 0-1.5-1.5H3.75A1.5 
                   1.5 0 0 0 2.25 6v12a1.5 
                   1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 
                   0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
        </label>
        <Button color="primary" type="submit">
          Post
        </Button>
      </div>
    </form>
  );
}
