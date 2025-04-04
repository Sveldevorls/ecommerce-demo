import { useOutletContext } from "react-router-dom";

export default function Cart() {
    const { cart, setCart } = useOutletContext();

    return (
        <>
            {cart.length > 0 ?
                cart.map(item =>
                    <div key={item.id}>
                        <h2>{item.details.title}</h2>
                        <h3>{item.quantity}</h3>
                    </div>
                ) :
                <h2>Cart is empty</h2>
            }
        </>
    )
}