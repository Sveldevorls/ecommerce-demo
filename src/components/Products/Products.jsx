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
                {products.map(item =>
                    <ProductCard item={item} />
                )}
            </div>
        </>
    )
}

function ProductCard({ item }) {
    const ratingStars = ((rating) => {
        const res = [];
        for (let i = 0; i < 5; i++) {
            if (rating - i >= 1) res.push(starFull)
            else if (rating - i >= 0.5) res.push(starHalf)
            else res.push(starNone)
        }
        return res
    })(item.rating.rate)

    return (

        <div key={item.id} className={styles.card}>
            <Link to={`./${item.id}`}>
                <div className={styles.productImage}>
                    <img src={item.image} alt={item.title} />
                </div>
            </Link >
            <Link to={`./${item.id}`}>
                <span className={styles.productTitle}>
                    {item.title}
                </span>
            </Link>
            <span className={styles.price}>${item.price}</span>
            <div className={styles.starRating}>
                {ratingStars.map(img => <img src={img} />)}
            </div>

        </div>

    )
}