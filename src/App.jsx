import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "./components/Footer/Footer";

export default function App() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? []);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <>
            <Navbar cartItemCount={cart.length} />
            <div>
                <Outlet context={{ cart, setCart }} />
            </div>
            <Footer />
        </>
    )
}