import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login.jsx";
import { SignUp } from "../pages/SignUp.jsx";
import { Layout } from "../layout/Layout.jsx";
import { PrivateRoutes } from "../layout/PrivateRoutes.jsx";
import { PrivateAdminRoutes } from "../layout/PrivateRoutes.jsx"
import Home from "../pages/Home.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Profile from "../pages/Profile.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import EditAdmi from "../pages/EditAdmi.jsx"
import CreateRecipe from "../pages/CreateRecipe.jsx";
import EditRecipe from "../pages/EditRecipe.jsx";


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
            path : 'auth',
            element: <PrivateRoutes/>,
            children: [
                {
                    path: 'admin',
                    element: <PrivateAdminRoutes/>,
                    children: [
                        {
                            path: "editadmin",
                            element: <EditAdmi />
                        },
                        {
                            path: "recipe/:id/edit",
                            element: <EditRecipe />
                        },
                        {
                            path: 'newrecipe',
                            element: <CreateRecipe />
                        },

                    ]

                },
                {
                    path: 'recipe/:id',
                    children:[
                        {
                            index: true,
                            element: <RecipeDetail />
                        },
                    ]
                },
                {
                    path: 'profile',
                    children:[
                        {
                            index: true,
                            element: <Profile />
                        },
                        {
                            path: "edit",
                            element: <EditProfile />
                        },
                    ]
                },
            
            
                
            ]
            }
        ]
}])

