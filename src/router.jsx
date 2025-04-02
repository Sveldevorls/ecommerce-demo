import App from "./App";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";

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
            }
        ]
    },
];

export default routes;