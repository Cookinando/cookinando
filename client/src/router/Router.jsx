import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login.jsx";
import { SignUp } from "../pages/SignUp.jsx";
import Layout from "../layout/Layout";
import  Home  from "../pages/Home.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Profile from "../pages/Profile.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import EditAdmi from "../pages/EditAdmi.jsx"
import { ProtectedRoute } from "../context/ProtectedRoute.jsx";

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
                path: 'recipe/:id',
                element: (
                    <ProtectedRoute>
                        <RecipeDetail />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
              path: "/editprofile",
              element: (
                <ProtectedRoute>
                    <EditProfile />
                </ProtectedRoute>
            ),
            },
            {   
              element: <EditProfile />,
            },
            {
              path: "editadmin",
              element: <EditAdmi />
            }
    ]

}])

