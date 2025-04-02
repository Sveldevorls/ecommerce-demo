import { useLoaderData } from "react-router-dom"

export default function ProductPage() {
    const product = useLoaderData();
    console.log(product)

    return (
        <>
        {product ?
            <h2>{product && product.title}</h2> :
            <h2>Error: product not found</h2>
        }
        </>
    )
}