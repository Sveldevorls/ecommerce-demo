import { useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import { Outlet } from "react-router-dom"

export default function App() {
    const [cart, setCart] = useState([]);
    console.log(cart);

    return (
        <>
            <Navbar cartItemCount={cart.length}/>
            <Outlet context={{cart, setCart}}/>
        </>
    )
}