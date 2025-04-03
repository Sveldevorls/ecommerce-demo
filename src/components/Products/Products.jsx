import { Link, useLoaderData } from "react-router-dom";

export default function Products() {
    const products = useLoaderData();

    return (
        <>
            <h1>Our Products</h1>
            <div>
                {products.map(item => <h2><Link to={`./${item.id}`}>{item.title}</Link></h2>)}
            </div>
        </>
    )
}