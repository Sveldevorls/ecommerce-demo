import { useState, useEffect } from "react"

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
        <>
            <button
                onClick={() => setQuantity(quantity => quantity - 1)}
                disabled={quantity <= 1}
            >
                -
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
                +
            </button>
        </>
    )
}