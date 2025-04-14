import { useOutletContext } from "react-router-dom";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useRef } from "react";
import styles from "./Cart.module.css"
import Decimal from "decimal.js";

const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export default function Cart() {
    const { cart, setCart } = useOutletContext();

    const updateQuantity = (item) =>
        (newQuantity) => {
            const nextCart = cart.map(entry =>
                entry.product.id == item.product.id ?
                    { ...entry, quantity: newQuantity } :
                    entry
            );
            setCart(nextCart);
        }

    const totalPrice = formatPrice(
        cart.reduce((sum, cartEntry) =>
            Decimal.add(sum, Decimal(cartEntry.product.price).mul(cartEntry.quantity)), Decimal(0)
        ).toNumber()
    )




    if (cart.length == 0) {
        return (
            <h2>Cart is empty</h2>
        )
    }

    return (
        <>
            <h2>Cart</h2>
            <div className={styles.cartContainer}>
                <div className={styles.cartItems}>
                    <div className={styles.cartHeader}>
                        <p>Product</p>
                        <div>
                            <p>Quantity</p>
                            <p>Price</p>
                        </div>
                    </div>
                    {cart.map(item =>
                        <ItemDisplay
                            item={item}
                            callback={updateQuantity(item)}
                        />)}
                </div>
                <div className={styles.cartSummary}>
                    <h2>Summary</h2>
                    <div className={styles.subtotal}>
                        <p>Subtotal:</p>
                        <p>{totalPrice}</p>
                    </div>
                    <div className={styles.shipping}>
                        <p>Shipping:</p>
                        <p>$0.00</p>
                    </div>

                    <div className={styles.total}>
                        <h2>Total</h2>
                        <p>{totalPrice}</p>
                    </div>

                    <button className={styles.checkout}>Go to checkout</button>
                </div>
            </div>
        </>
    )
}

function ItemDisplay({ item, callback }) {
    const quantityRef = useRef(null);

    return (
        <div className={styles.cartEntry} key={item.product.id} data-id={item.product.id} >
            <div className={styles.productInfo}>
                <div className={styles.imageContainer}>
                    <img src={item.product.image} alt="" />
                </div>
                <span className={styles.productTitle}>
                    {item.product.title}
                </span>
            </div>

            <div className={styles.productQuantity}>
                <QuantitySelector
                    initQuantity={item.quantity}
                    maximum={item.product.rating.count}
                    ref={quantityRef}
                    callback={() => callback(parseInt(quantityRef.current.value, 10))}
                />

                <span>
                    {formatPrice((Decimal(item.product.price).mul(item.quantity)).toNumber())}
                </span>
            </div>
        </div>
    )
}