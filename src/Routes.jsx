import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import PostDetails from "./Pages/Posts/PostDetails"
import Profile from "./Pages/Profile/Profile"
import AuthLayout from "./Layouts/AuthLayout"
import NotFound from "./Components/NotFound/NotFound"
import ProtecedPrvider from "./Components/ProtecedPrvider/ProtecedPrvider"
import AuthProtected from "./Components/AuthProtecetd/AuthProtected"




const Router =createBrowserRouter([
        {path:"" ,element: <MainLayout/> , children:[
            {index:true, element :<ProtecedPrvider><Home/></ProtecedPrvider> },
{path: `post-details/:id`,element: <ProtecedPrvider><PostDetails /></ProtecedPrvider>},
            {path:"profile", element : <ProtecedPrvider><Profile/></ProtecedPrvider>},
            {path:"*", element : <NotFound/>},
    ]},
    {path:"" ,element : <AuthLayout/> , children:[
             {path:"login", element : <AuthProtected><Login/></AuthProtected>},
            {path:"register", element : <AuthProtected><Register/></AuthProtected>},
    ]}

])
export default function Routes() {
  return <>
  
  <RouterProvider router ={Router}/>
  </>
}