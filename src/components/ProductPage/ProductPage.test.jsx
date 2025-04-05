import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import ProductPage from './ProductPage';
import userEvent from '@testing-library/user-event';
import App from '../../App'

const cartAddSuccessMessage = "Added to cart";
const cartAddFailMessage = "Can't add more to cart";
const productData = { id: 0, title: "Sample item", rating: { count: 100 } }

describe("ProductPage module", () => {
    const routes = [{
        path: "/",
        element: <Outlet context={{
            cart: [],
            setCart: () => [],
        }} />,
        children: [
            {
                path: "/products/:productID",
                element: <ProductPage />,
                loader: ({ params }) =>
                    params.productID == 0 ?
                        productData :
                        null
            }
        ]
    }];

    // Fail case
    it("Shows error page when data is wrong", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/999"] }
        );
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            screen.getByText(/Error/)
        });
        
        expect(screen.getByText(/Error/)).toBeInTheDocument();
    })

    // Success case
    it("Displays fetched data", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/0"] }
        );
        render(
            <RouterProvider router={router} />
        );

        await waitFor(() => {
            screen.getByText(productData.title)
        });

        expect(screen.getByText(productData.title)).toBeInTheDocument();
    })

    it("Shows correct remaining item count", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/0"] }
        );

        render(<RouterProvider router={router} />);

        await waitFor(async () => {
            screen.getByText(`${productData.rating.count} items left in stock`)
        });
        
        expect(screen.getByText(`${productData.rating.count} items left in stock`)).toBeInTheDocument();
    })
})

describe("Product page cart adding function", () => {
    const routes = [{
        path: "/",
        element: <App />,
        children: [
            {
                path: "/products/:productID",
                element: <ProductPage />,
                loader: ({ params }) =>
                    params.productID == 0 ?
                        productData :
                        null
            }
        ]
    }];

    it("Calls cart adder function when button is clicked", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/0"] }
        );
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        await waitFor(async () => {
            const button = screen.getByRole("button", { name: "Add to cart" });
            await user.click(button);
        });
        
        expect(screen.getByText(cartAddSuccessMessage)).toBeInTheDocument();
    })

    it("Stops item being added if the result quantity is larger than the current stock", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/0"] }
        );
        render(<RouterProvider router={router} />);
        const user = userEvent.setup();

        let button;
        let quantityInput;

        await waitFor(async () => {
            button = screen.getByRole("button", { name: "Add to cart" });
            quantityInput = screen.getByRole("textbox");
            await user.type(quantityInput, "{backspace}50");
            expect(quantityInput.value).toEqual("50");
        })
        
        await waitFor(async () => {
            await user.click(button); // 50
            expect(screen.queryByText(cartAddFailMessage)).not.toBeInTheDocument();
        })

        await waitFor(async () => {
            await user.click(button); // 100
            expect(screen.queryByText(cartAddFailMessage)).not.toBeInTheDocument();
        })

        await waitFor(async () => {
            await user.click(button); // 150 -> fail
            expect(screen.queryByText(cartAddFailMessage)).toBeInTheDocument();
        })

        
    })
})