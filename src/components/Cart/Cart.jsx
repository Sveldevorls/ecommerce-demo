import { useOutletContext, Link } from "react-router-dom";
import { useRef, useState } from "react";
import Decimal from "decimal.js";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

import "../../colors.css";
import components from "../../components.module.css";
import styles from "./Cart.module.css";

import truck from "../../assets/truck-outline.svg";


const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export default function Cart() {
    const { cart, setCart } = useOutletContext();
    const [removalProduct, setRemovalProduct] = useState(null);
    const removeConfirmRef = useRef(null);
    const dialogContainerRef = useRef(null);

    const updateProuductQuantity = (product) =>
        (newQuantity) => {
            const nextCart = cart.map(entry =>
                entry.product.id == product.product.id ?
                    { ...entry, quantity: newQuantity } :
                    entry
            );
            setCart(nextCart);
        };

    const totalPrice = formatPrice(
        cart.reduce((sum, cartEntry) =>
            Decimal.add(sum, Decimal(cartEntry.product.price).mul(cartEntry.quantity)), Decimal(0)
        ).toNumber()
    );

    const deliveryDateStart = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" })
        .format(new Date((new Date).getTime() + 1000 * 60 * 60 * 24 * 7));
    const deliveryDateEnd = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" })
        .format(new Date((new Date).getTime() + 1000 * 60 * 60 * 24 * 14));

    function handleRemoveDialogClick(e) {
        if (!e.target.id) {
            return;
        };
        if (e.target.id == "confirm") {
            setCart(cart.filter(entry => entry.product.id != removalProduct.id));
        };

        dialogContainerRef.current.style.visibility = "hidden";
        removeConfirmRef.current.close();
    };


    if (cart.length == 0) {
        return (
            <div id="cart">
                <div className={styles.cart}>
                    <h2 className={components.title}>Cart</h2>
                    <div className={`${components.card} ${styles.cartEmptyCard}`}>
                        <p>Your cart is currently empty</p>
                        <Link to="/products" className={components.button}>
                            Check out our products
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div id="cart">
            <div className={styles.cart}>
                <h2 className={components.title}>Cart</h2>
                <div className={styles.cartContainer}>
                    <div className={styles.cartProducts}>
                        <div className={styles.cartProductstHeader}>
                            <p>Product</p>
                            <div>
                                <p>Quantity</p>
                                <p>Price</p>
                            </div>
                        </div>
                        {cart.map(product =>
                            <ProductDisplay
                                product={product}
                                callback={updateProuductQuantity(product)}
                                onRemoveClick={() => {
                                    setRemovalProduct(product.product);
                                    dialogContainerRef.current.style.visibility = "visible";
                                    removeConfirmRef.current.show();
                                }}
                            />
                        )}
                    </div>
                    <div className={`${styles.cartSummary} ${components.card}`}>
                        <div className={styles.cartSummaryPrices}>
                            <h2>Summary</h2>
                            <div className={styles.cartSummarySubtotal}>
                                <p>Subtotal:</p>
                                <p>{totalPrice}</p>
                            </div>
                            <div className={styles.cartSummaryShipping}>
                                <p>Shipping:</p>
                                <p>$0.00</p>
                            </div>
                        </div>

                        <div className={styles.cartSummaryDelivery}>
                            <img
                                className={components.iconLarge}
                                src={truck}
                            />
                            <div>
                                <p>Estimated delivery time</p>
                                <p>{deliveryDateStart} - {deliveryDateEnd}</p>
                            </div>
                        </div>

                        <div className={styles.cartSummaryTotal}>
                            <h2>Total</h2>
                            <p>{totalPrice}</p>
                        </div>

                        <button className={`${components.button} ${styles.cartSummaryCheckout}`}>
                            Go to checkout
                        </button>
                    </div>
                </div>
            </div>
            <div
                id="dialogContainer"
                className={styles.dialogContainer}
                ref={dialogContainerRef}
                onClick={(e) => handleRemoveDialogClick(e)}
            >
                <dialog
                    ref={removeConfirmRef}
                    className={styles.removeDialog}
                >
                    <p>Are you sure? This action can not be reversed</p>
                    <div className={styles.dialogItemInfo}>
                        {removalProduct &&
                            <div className={styles.cartProductImage}>
                                <img src={removalProduct.image} alt="Item image" />
                            </div>
                        }
                        <p className={`${components.productTitle} ${styles.dialogProductTitle}`}>
                            {removalProduct && removalProduct.title}
                        </p>
                    </div>
                    <div className={styles.dialogButtons}>
                        <button
                            id="cancel"
                            className={`${components.button} ${styles.dialogCancelButton}`}
                        >
                            Cancel
                        </button>
                        <button
                            id="confirm"
                            className={components.button}
                        >
                            Yes, remove this item
                        </button>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

function ProductDisplay({ product, callback, onRemoveClick }) {
    const quantityRef = useRef(null);

    return (
        <div className={styles.cartEntry} key={product.product.id} data-productid={product.product.id} >
            <div className={styles.cartEntryProductInfo}>
                <div className={styles.cartProductImage}>
                    <Link to={`/products/${product.product.id}`}>
                        <img src={product.product.image} alt="" />
                    </Link>
                </div>
                <span className={components.productTitle}>
                    <Link to={`/products/${product.product.id}`}>
                        {product.product.title}
                    </Link>
                </span>
            </div>

            <div className={styles.cartEntryRight}>
                <QuantitySelector
                    initQuantity={product.quantity}
                    maximum={product.product.rating.count}
                    ref={quantityRef}
                    callback={() => callback(parseInt(quantityRef.current.value, 10))}
                />
                <div className={styles.cartEntryPriceColumn}>
                    <p>
                        {formatPrice((Decimal(product.product.price).mul(product.quantity)).toNumber())}
                    </p>
                    <button onClick={onRemoveClick} className={styles.cartEntryRemoveButton}>
                        Remove
                    </button>
                </div>
            </div>
        </div >
    );
};