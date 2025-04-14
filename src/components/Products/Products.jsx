import { Link, useLoaderData } from "react-router-dom";
import styles from "./Products.module.css"

import starNone from "../../assets/star-none.svg"
import starHalf from "../../assets/star-half.svg"
import starFull from "../../assets/star-full.svg"


export default function Products() {
    const products = useLoaderData();

    return (
        <>
            <div className={styles.header}>
                <h2>Our Products</h2>
            </div>
            <div className={styles.products}>
                {products.map(product =>
                    <ProductCard product={product} />
                )}
            </div>
        </>
    )
}

function ProductCard({ product }) {
    const ratingStars = ((rating) => {
        const res = [];
        for (let i = 0; i < 5; i++) {
            if (rating - i >= 1) res.push(starFull)
            else if (rating - i >= 0.5) res.push(starHalf)
            else res.push(starNone)
        }
        return res
    })(product.rating.rate)
    const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)

    return (

        <div key={product.id} className={styles.card}>
            <Link to={`./${product.id}`}>
                <div className={styles.productImage}>
                    <img src={product.image} alt={product.title} />
                </div>
            </Link >
            <Link to={`./${product.id}`}>
                <span className={styles.productTitle}>
                    {product.title}
                </span>
            </Link>
            <span className={styles.price}>{formatPrice(Number(product.price))}</span>
            <div className={styles.starRating}>
                {ratingStars.map(img => <img src={img} />)}
            </div>

        </div>

    )
}