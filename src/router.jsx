import App from "./App";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductPage from "./components/ProductPage/ProductPage";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/products/",
                loader: async () => {
                    let products = await fetch("https://fakestoreapi.com/products");
                    let result = await products.json();
                    return result
                },
                element: <Products />
            },
            {
                path: "/products/:productID",
                loader: async ({ params }) => {
                    let products = await fetch("https://fakestoreapi.com/products/" + params.productID);
                    try {
                        let result = await products.json();
                        return result
                    } catch {
                        return null
                    }
                },
                element: <ProductPage />
            }
        ]
    },
];

export default routes;