import axios from "axios";
    const token = localStorage.getItem("token")


export async function getAllComments(postId) {

const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`,{
    headers:{
        token
    }
})
return data
}


// Create Comment

export async function CreateComment(commentContent,postId){

 const {data} = await axios.post(`https://linked-posts.routemisr.com/comments`,{
    content:commentContent, 
    post:postId
 },{
        headers:{
            token
        }
    })
    return data
}

// Delete Comment

export async function DeleteComment(id) {

    const {data}= await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
        headers:{
            token
        }
    })
    return data
    
}


// Edit Comment 

export async function EditComment(id,content) {

    const {data}= await axios.put(`https://linked-posts.routemisr.com/comments/${id}`,{
        content
    },{
        headers:{
            token
        }
    })

    return data

    
}