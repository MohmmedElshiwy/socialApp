import axios from "axios";
// Register User
export async function handelRegister(userData) {
    const { data } = await axios.post("https://linked-posts.routemisr.com/users/signup", userData);
   
    return data;
}

// Login User   
export async function handelLogin(userData) {
    const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", userData);
    // console.log(data);
    
   
    return data;
}


// Get User Profile

export async function getUserProfile() {
    const token = localStorage.getItem("token");
    const {data} = await axios.get("https://linked-posts.routemisr.com/users/profile-data",{
        headers:{
            token
        }
    }) 
    // console.log(data);
    return data
    

}

export async function updateUserPhoto(formData) {
  const token = localStorage.getItem("token");
  const { data } = await axios.put(
    "https://linked-posts.routemisr.com/users/upload-photo",
    formData,
    {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.user; // رجع الداتا المهمة بس
}

