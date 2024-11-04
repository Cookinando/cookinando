import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import  Home  from "../components/Home.jsx";
import { Login } from "../pages/Login.jsx";
import { SignUp } from "../pages/SignUp.jsx";
import { RecipeDetail } from "../pages/RecipeDetail.jsx";
import { About } from "../pages/About.jsx";
import { Contact } from "../pages/Contact.jsx";
import { getAllRecipes} from '';

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
                path: 'recetas/:id',
                element: <RecipeDetail />
            },
            {
                path:'about',
                element: <About/>
            },
            {
                path:'contact',
                element: <Contact/>
            }
           
    ]

}])

