import { Button, CardBody,  Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";

// import { useMutation } from "@tanstack/react-query";

export default function PostBody({ body, image, name,id}) {
  const route=useNavigate()

  
// const {}=useMutation({
//   mutationFn :()=>CreatePost()
// })
  function handleImageClick() {
    route(`/post-details/${id}`);
  }
  function AddFile(){
    return <input type="file"/>
  }
  return (
    <>
    <CardBody  onClick={handleImageClick} className="px-3 py-0 min-h-96 text-small text-default-400 cursor-pointer gap-4">
      <>
      <p>{body && body}</p>
        {image && (
          <img 
            src={image}
            alt={name}
            className="w-full max-h-96 object-fill rounded-lg mb-2"
          />
        )}
       
      </>

    </CardBody>
   
    
    </>
  );
}
