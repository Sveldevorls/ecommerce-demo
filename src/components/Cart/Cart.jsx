import { useOutletContext, Link } from "react-router-dom";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useRef } from "react";
import styles from "./Cart.module.css"
import Decimal from "decimal.js";
import truck from "../../assets/truck-outline.svg"


const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export default function Cart() {
    const { cart, setCart } = useOutletContext();

    const updateQuantity = (product) =>
        (newQuantity) => {
            const nextCart = cart.map(entry =>
                entry.product.id == product.product.id ?
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

    const deliveryDateStart = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" })
        .format(new Date((new Date).getTime() + 1000 * 60 * 60 * 24 * 7))
    const deliveryDateEnd = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" })
        .format(new Date((new Date).getTime() + 1000 * 60 * 60 * 24 * 14))




    if (cart.length == 0) {
        return (
            <div className={styles.cartBase}>
                <h2 className={styles.title}>Cart</h2>
                <div className={styles.cartEmptyCard}>
                    <span>Your cart is currently empty</span>
                    <Link to="/products">
                        <button>Check out our products</button>
                    </Link>
                </div>
            </div>
        )

    }

    return (
        <div className={styles.cartBase}>
            <h2 className={styles.title}>Cart</h2>
            <div className={styles.cartContainer}>
                <div className={styles.cartProducts}>
                    <div className={styles.cartHeader}>
                        <p>Product</p>
                        <div>
                            <p>Quantity</p>
                            <p>Price</p>
                        </div>
                    </div>
                    {cart.map(product =>
                        <ProductDisplay
                            product={product}
                            callback={updateQuantity(product)}
                        />)}
                </div>
                <div className={styles.cartSummary}>
                    <div>
                        <h2>Summary</h2>
                        <div className={styles.subtotal}>
                            <p>Subtotal:</p>
                            <p>{totalPrice}</p>
                        </div>
                        <div className={styles.shipping}>
                            <p>Shipping:</p>
                            <p>$0.00</p>
                        </div>
                    </div>

                    <div className={styles.delivery}>
                        <img src={truck} alt="" />
                        <div>
                            <p>Estimated delivery time</p>
                            <p>{deliveryDateStart} - {deliveryDateEnd}</p>
                        </div>
                    </div>

                    <div className={styles.total}>
                        <h2>Total</h2>
                        <p>{totalPrice}</p>
                    </div>

                    <button className={styles.checkout}>Go to checkout</button>
                </div>
            </div>
        </div>
    )
}

function ProductDisplay({ product, callback }) {
    const quantityRef = useRef(null);

    return (
        <div className={styles.cartEntry} key={product.product.id} data-id={product.product.id} >
            <div className={styles.productInfo}>
                <div className={styles.imageContainer}>
                    <Link to={`/products/${product.product.id}`}>
                        <img src={product.product.image} alt="" />
                    </Link>
                </div>
                <span className={styles.productTitle}>
                    <Link to={`/products/${product.product.id}`}>
                        {product.product.title}
                    </Link>
                </span>
            </div>

            <div className={styles.productQuantity}>
                <QuantitySelector
                    initQuantity={product.quantity}
                    maximum={product.product.rating.count}
                    ref={quantityRef}
                    callback={() => callback(parseInt(quantityRef.current.value, 10))}
                />

                <span>
                    {formatPrice((Decimal(product.product.price).mul(product.quantity)).toNumber())}
                </span>
            </div>
        </div >
    )
}