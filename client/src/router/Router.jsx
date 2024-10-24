import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import { Home } from "../pages/Home.jsx";
import { Login } from "../pages/Login.jsx";
import { SignUp } from "../pages/SignUp.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import { Profile } from "../pages/Profile.jsx";


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
                element: <RecipeDetail />
            },
            {
                path:'profile',
                element: <Profile/>
            }
    ]

}])

