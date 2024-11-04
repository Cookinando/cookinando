import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import  Home  from "../pages/Home.jsx";
import { Login } from "../pages/Login.jsx";
import { SignUp } from "../pages/SignUp.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import EditAdmi from "../pages/EditAdmi.jsx";
import Profile from "../pages/Profile.jsx";
import EditProfile from "../pages/EditProfile.jsx";

export const router = createBrowserRouter([{
    
    path : '/',
    element: <Layout/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'signup',
                element: <SignUp/>
            },
            {
                path:'profile',
                element: <Profile />
            },
            {
                path:'editprofile',
                element: <EditProfile />
            },
            {
                path: 'recipe/:id',
                element: <RecipeDetail />
            },
            {
                path:'editadmin',
                element: <EditAdmi />
            }
           
    ]

}])

