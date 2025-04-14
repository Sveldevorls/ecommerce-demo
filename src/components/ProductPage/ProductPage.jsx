import { useRef, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom"
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import styles from "./ProductPage.module.css"

import starNone from "../../assets/star-none.svg"
import starHalf from "../../assets/star-half.svg"
import starFull from "../../assets/star-full.svg"

export default function ProductPage() {
    const product = useLoaderData();
    const { cart, setCart } = useOutletContext();
    const [message, setMessage] = useState("")
    const quantityRef = useRef(null);
    const messageRef = useRef(null);

    // Product doesnt exist (bad ID)
    if (!product) return <h2>Error: product not found</h2>


    const productStockCount = product.rating.count;
    const ratingStars = ((rating) => {
        const res = [];
        for (let i = 0; i < 5; i++) {
            if (rating - i >= 1) res.push(starFull)
            else if (rating - i >= 0.5) res.push(starHalf)
            else res.push(starNone)
        }
        return res
    })(product.rating.rate)

    function handleAddToCartClick(item) {
        const nextCart = cart.slice();
        const cartItemEntry = nextCart.find(entry => entry.product.id == item.id);

        // item already in cart 
        if (cartItemEntry) {
            if (cartItemEntry.quantity + parseInt(quantityRef.current.value, 10) > productStockCount) {
                setMessage("Can't add more to cart");
                messageRef.current.style.opacity = 1;
                messageRef.current.style.background = "#f0abab";
                setTimeout(() => {
                    messageRef.current.style.opacity = 0;
                }, 5000)
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
        messageRef.current.style.opacity = 1;
        messageRef.current.style.background = "#98e698";
        setTimeout(() => {
            messageRef.current.style.opacity = 0;
        }, 5000)
    }

    const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)

    return (
        <div className={styles.productDisplay}>
            <div className={styles.productImage}>
                <img src={product.image} alt={product.title} />
            </div>

            <div className={styles.productDetails}>
                <div className={styles.productHeader}>
                    <h2>{product.title}</h2>
                    <div className={styles.rating}>
                        <p>{product.rating.rate.toFixed(1)}</p>
                        <div className={styles.starRating}>
                            {ratingStars.map(star => <img src={star} />)}
                        </div>
                    </div>
                    <p className={styles.price}>
                        {formatPrice(Number(product.price))}
                    </p>
                </div>

                <p className={styles.productDescription}>
                    {product.description}
                </p>

                <div className={styles.productAdd}>
                    <span>Quantity</span>
                    <QuantitySelector
                        initQuantity={1}
                        maximum={productStockCount}
                        ref={quantityRef}
                    />
                    <span>{productStockCount} item{productStockCount > 1 && "s"} left in stock</span>
                    <button onClick={() => handleAddToCartClick(product)} className={styles.addButton}>Add to cart</button>
                </div>
            </div>

            <p className={styles.actionMessage} ref={messageRef}>
                {message}
            </p>
        </div>
    )
}