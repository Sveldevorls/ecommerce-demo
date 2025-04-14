import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import { Outlet, useLocation } from "react-router-dom"

export default function App() {
    const [cart, setCart] = useState([]);
    const location = useLocation();
    
    useEffect(() => {
        document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <>
            <Navbar cartItemCount={cart.length}/>
            <Outlet context={{cart, setCart}}/>
        </>
    )
}