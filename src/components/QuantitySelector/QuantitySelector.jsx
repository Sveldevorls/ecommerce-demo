import { useState, useEffect } from "react"
import styles from "./QuantitySelector.module.css"
import plus from "../../assets/plus.svg"
import minus from "../../assets/minus.svg"

export default function QuantitySelector({ initQuantity = 1, maximum = Infinity, callback, ref }) {
    const [quantity, setQuantity] = useState(initQuantity);
    const [previousQuantity, setPreviousQuantity] = useState(initQuantity)

    useEffect(() => {
        if (quantity != null && callback) {
            callback();
        }
    }, [quantity]);

    function handleQuantityChange(value) {
        if (value == "") {
            setQuantity(null);
            return
        }
        const isInteger = /^[1-9]\d*$/.test(value);
        if (isInteger) {
            setQuantity(Math.min(parseInt(value, 10), maximum));
        }
    }

    return (
        <div className={styles.quantitySelector}>
            <button
                onClick={() => setQuantity(quantity => quantity - 1)}
                disabled={quantity <= 1}
            >
                <img src={minus} alt="-" />
            </button>
            <input
                type="text"
                inputMode="numeric"
                value={quantity == null ? "" : quantity}
                ref={ref}
                onChange={(e) => handleQuantityChange(e.target.value)}
                onBlur={() => !quantity && setQuantity(previousQuantity)}
                onFocus={() => setPreviousQuantity(quantity)}
            />
            <button
                onClick={() => setQuantity(quantity => quantity + 1)}
                disabled={quantity >= maximum}
            >
                <img src={plus} alt="+" />
            </button>
        </div>
    )
}