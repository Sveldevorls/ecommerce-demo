import { useOutletContext } from "react-router-dom";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useRef } from "react";

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


    if (cart.length == 0) {
        return (
            <h2>Cart is empty</h2>
        )
    }



    return (
        <>
            {cart.map(item => <ItemDisplay item={item} callback={updateQuantity(item)} />)}
        </>
    )
}

function ItemDisplay({ item, callback }) {
    const quantityRef = useRef(null);

    return (
        <div key={item.product.id} data-id={item.product.id}>
            <h2>{item.product.title}</h2>
            <QuantitySelector
                initQuantity={item.quantity}
                maximum={item.product.rating.count}
                ref={quantityRef}
                callback={() => callback(parseInt(quantityRef.current.value, 10))}
            />
            <h3>{(item.product.price * item.quantity).toLocaleString()}</h3>
        </div>
    )
}