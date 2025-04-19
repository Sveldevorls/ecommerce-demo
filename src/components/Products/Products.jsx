import { Link, useLoaderData } from "react-router-dom";

import "../../colors.css";
import styles from "./Products.module.css";
import components from "../../components.module.css";

import starNone from "../../assets/star-none.svg";
import starHalf from "../../assets/star-half.svg";
import starFull from "../../assets/star-full.svg";


export default function Products() {
    const products = useLoaderData();
    const fakeDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" })
        .format(new Date((new Date).getTime() + 1000 * 60 * 60 * 24 * 7));

    return (
        <div id="products">
            <div className={components.announcementBanner}>
                <h2>2 year anniversary event - free worldwide shipping until {fakeDate}</h2>
            </div>
            <div className={styles.products}>
                {products.map(product =>
                    <ProductCard
                        product={product}
                        key={product.title}
                    />
                )}
            </div>
        </div>
    );
};

function ProductCard({ product }) {
    const ratingStars = ((rating) => {
        const res = [];
        for (let i = 0; i < 5; i++) {
            if (rating - i >= 1) res.push(starFull)
            else if (rating - i >= 0.5) res.push(starHalf)
            else res.push(starNone)
        };
        return res;
    })(product.rating.rate);
    const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

    return (
        <div key={product.id} className={styles.productCard}>
            <Link to={`./${product.id}`}>
                <div className={styles.productImage}>
                    <img src={product.image} alt="Product image"/>
                </div>
            </Link >
            <Link to={`./${product.id}`}>
                <span className={components.productTitle}>
                    {product.title}
                </span>
            </Link>
            <span className={styles.productPrice}>
                {formatPrice(Number(product.price))}
            </span>
            <div>
                {ratingStars.map((img, index) =>
                    <img
                        className={styles.productRatingStar}
                        src={img}
                        key={index}
                    />
                )}
            </div>
        </div>
    );
};