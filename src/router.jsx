import App from "./App";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
import { NotFound, ProductNotFound } from "./components/Errors/Errors";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/products",
                loader: async () => {
                    try {
                        let products = await fetch("https://fakestoreapi.com/products");
                        let result = await products.json();
                        return result;
                    } 
                    catch {
                        return null;
                    }
                },
                element: <Products />
            },
            {
                path: "/products/:productID",
                loader: async ({ params }) => {
                    let products = await fetch("https://fakestoreapi.com/products/" + params.productID);
                    try {
                        let result = await products.json();
                        return result;
                    } 
                    catch {
                        return null;
                    }
                },
                errorElement: <ProductNotFound />,
                element: <ProductPage />,
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/about-us",
                element: <About />
            },
        ]
    },
];

export default routes;