import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

export const router = createBrowserRouter([{
    
    path : '/',
    element: <Layout/>,
    children: [
        {
            index: true,
            element: <Home/>
    },
    {
        path:'nav',
        element: <Navbar/>
    },
    {
        path:'footer',
        element: <Footer/>
    },
]

}])

