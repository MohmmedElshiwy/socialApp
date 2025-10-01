import axios from "axios";

// get all posts 

export async function getAllPosts(page=1 ,limit=10) {
    const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `https://linked-posts.routemisr.com/posts?page=${page}&limit=${limit}&sort=-createdAt`,
    { headers: { token } }
  );
  return data;
}


// Post Details

export async function getPostDetails(id) {
    const token = localStorage.getItem("token");

    const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
            token
        }
    })
    return data
}


// Create Post

export async function createPost(formdata) {

    const token=localStorage.getItem("token")

    const {data} = await axios.post("https://linked-posts.routemisr.com/posts",formdata
    ,{
        headers:{
            token,
            "Content-Type" :"multipart/form-data"
        }
    })
    return data
}



// user Posts

export async function UserPosts(id) {

    const token = localStorage.getItem("token")

    const {data} = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`,{
        headers:{
            token
        }
    })

    return data.posts
}


// Delete Post

export async function DeletePost(id) {

    const token = localStorage.getItem("token")

    const {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
            token
        }
    })

    return data
}