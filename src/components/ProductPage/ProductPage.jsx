import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom"

export default function ProductPage() {
    const product = useLoaderData();
    const { cart, setCart } = useOutletContext();
    const [message, setMessage] = useState("")

    function handleAddToCartClick(item) {
        const nextCart = cart.slice();
        const prevItem = nextCart.find(e => e.id == item.id);

        if (prevItem) {
            prevItem.quantity++;
            setCart(nextCart);
        }
        else {
            const itemDetails = Object.fromEntries(Object.entries(item).filter(([k]) => k != "id"));
            const entry = {
                id: item.id,
                details: itemDetails,
                quantity: 1
            }
            setCart([...cart, entry]);
        }

        setMessage("Added to cart");
    }

    if (!product) return <h2>Error: product not found</h2>

    return (
        <>
            <h2>{product && product.title}</h2>
            <button onClick={() => handleAddToCartClick(product)}>Add to cart</button>
            <h2>{message}</h2>
        </>
    )
}