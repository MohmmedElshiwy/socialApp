import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Dots from "./Dots";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DropDown({ deleteFn, editFn ,queryKey}) {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      if(queryKey==="comments"){

        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast.success("Comment deleted successfully ✅");
      }
     else if(queryKey ==="posts"){

       queryClient.invalidateQueries({ queryKey: ["posts"] });
       toast.success("Post deleted successfully ✅");
    } 
      

      
    },
    onError: () => toast.error("Failed to delete comment ❌"),
  });

  return (
    <Dropdown>
      <DropdownTrigger>
        <span><Dots /></span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        {editFn && (
          <DropdownItem key="edit" color="secondary" onClick={editFn}>
            Edit
          </DropdownItem>
        )}
        {deleteFn && (
          <DropdownItem key="delete" className="text-danger" color="danger" onClick={deleteComment}>
            Delete
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
