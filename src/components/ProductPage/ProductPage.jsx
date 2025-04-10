import { useRef, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom"
import QuantitySelector from "../QuantitySelector/QuantitySelector";

export default function ProductPage() {
    const product = useLoaderData();
    const { cart, setCart } = useOutletContext();
    const [message, setMessage] = useState("")
    const quantityRef = useRef(null);

    // Product doesnt exist (bad ID)
    if (!product) return <h2>Error: product not found</h2>


    const productStockCount = product.rating.count;

    function handleAddToCartClick(item) {
        /* if (productStockCount == 0) {
            setMessage("Stock is empty now");
            return
        } */

        const nextCart = cart.slice();
        const cartItemEntry = nextCart.find(entry => entry.product.id == item.id);

        // item already in cart 
        if (cartItemEntry) {
            if (cartItemEntry.quantity + parseInt(quantityRef.current.value, 10) > productStockCount) {
                setMessage("Can't add more to cart");
                return
            }
            cartItemEntry.quantity += parseInt(quantityRef.current.value, 10);
            setCart(nextCart);
        }

        // item not yet in cart
        else {
            const entry = {
                product: item,
                quantity: parseInt(quantityRef.current.value, 10),
            }
            setCart([...cart, entry]);
        }

        setMessage("Added to cart");
    }

    return (
        <>
            <h2>{product && product.title}</h2>
            <QuantitySelector
                initQuantity={1}
                maximum={productStockCount}
                ref={quantityRef}
            />
            <h2>{productStockCount} items left in stock</h2>
            <button onClick={() => handleAddToCartClick(product)}>Add to cart</button>
            <h2>{message}</h2>
        </>
    )
}