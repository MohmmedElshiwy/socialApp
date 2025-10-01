import { Button, CardHeader } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPhoto } from "../../Services/user/usersAuth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function PostAvatar({ photo, createdAt, name, cssImg, cssText, editPoho }) {

  const queryClient = useQueryClient();
  const [hiddenCreatedAt, setHiddenCreatedAt] = useState(true)


  const { mutate, isPending } = useMutation({
    mutationFn: updateUserPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] },
            queryClient.invalidateQueries({ queryKey: ["posts"] })
      );
      toast.success("Photo Uploaded Successfully");
      setImage(null);
      setImgUrl("");
    },
    onError: () => toast.error("Upload failed, try again!"),
  });

  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  function updatePhoto(e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("photo", image);
    mutate(formData);
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImgUrl(URL.createObjectURL(file));
    e.target.value = "";
  }

  // تنظيف الـ ObjectURL
  useEffect(() => {
    return () => {
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
  }, [imgUrl]);

  useEffect(()=>{

    if(document.title === "Profile"){

      setHiddenCreatedAt(false)
    }
  },[])

  return (
    <CardHeader className="justify-between  relative ">

  

      <div className="flex gap-5  p-4">
        <div className="flex flex-col items-center relative bg-gray-300 p-2 rounded-2xl">
          <img
            src={imgUrl || photo || "/user-icon-on-transparent-background-free-png.webp"}
            className={cssImg ? cssImg : "size-10 rounded-full border "}
            onError={(e) => {
              e.currentTarget.src = "/user-icon-on-transparent-background-free-png.webp";
            }}
            alt={name}
          />

          {/* فورم رفع الصورة */}
          <form onSubmit={updatePhoto}>
            <label className="text-blue-400 cursor-pointer absolute end-1 bottom-0.5">
              {editPoho}
              <input onChange={handleImage} type="file" hidden />
            </label>

            {/* أزرار التحكم */}
            {imgUrl && (
              <div className="flex  gap-2 mt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs"
                >
                  {isPending ? "Uploading..." : "Upload"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setImgUrl("");
                    setImage(null);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-xs"
                >
                  ❌ Cancel
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className={cssText ? cssText : `text-small font-semibold leading-none text-black uppercase`}>
            {name || "Unknown"}
          </h4>
{hiddenCreatedAt && (

          <h5 className={cssText ? cssText : `text-small font-semibold leading-none text-black uppercase`}>
            {createdAt ? createdAt.split(".", 1)[0].replace("T", " ") : ""}
          </h5>)
}

        </div>
      </div>
     
    </CardHeader>
  );
}
