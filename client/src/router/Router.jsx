import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login.jsx";
import { SignUp } from "../pages/SignUp.jsx";
import PublicLayout from "../layout/PublicLayout.jsx";
import Home from "../pages/Home.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Profile from "../pages/Profile.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import EditAdmi from "../pages/EditAdmi.jsx"
import CreateRecipe from "../pages/CreateRecipe.jsx";
import { PrivateLayout } from "../layout/PrivateLayout.jsx";

export const router = createBrowserRouter([{
    
    path : '/',
    element: <PublicLayout/>,
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
            element: <PrivateLayout/>,
            children: [
                {
                    path: 'newrecipe',
                    element: <CreateRecipe />
                },
                {
                    path: 'recipe/:id',
                    element: <RecipeDetail />
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
                        {
                            path: "editadmin",
                            element: <EditAdmi />
                        }
                    ]
                },
            
                
            ]
            }
        ]
}])

