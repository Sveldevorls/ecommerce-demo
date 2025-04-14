import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function AppMock({ initCart = [] }) {
    const [cart, setCart] = useState(initCart);

    return (
        <Outlet context={{ cart, setCart }} />
    )
}