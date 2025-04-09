import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import Cart from './Cart';
import AppMock from './AppMock';
import userEvent from '@testing-library/user-event';


describe("ProductPage module", () => {
    it("Displays error message when cart is empty", async () => {
        const context = {
            cart: [],
            setCart: () => [],
        }

        const routes = [{
            path: "/",
            element: <Outlet context={context} />,
            children: [
                {
                    path: "/cart",
                    element: <Cart />,
                }
            ]
        }];

        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/cart"] }
        );

        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.getByText("Cart is empty")).toBeInTheDocument();
        });
    })

    it("Displays correct item count", async () => {
        const cartTestData = [
            {
                product: {
                    id: 1,
                    title: "Sample item",
                    rating: { count: 100 }
                },
                quantity: 100,
            }
        ]

        const context = {
            cart: cartTestData,
            setCart: () => [],
        }

        const routes = [{
            path: "/",
            element: <Outlet context={context} />,
            children: [
                {
                    path: "/cart",
                    element: <Cart />,
                }
            ]
        }];

        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/cart"] }
        );

        const { container } = render(<RouterProvider router={router} />);

        await waitFor(() => {
            const itemDiv = container.querySelector(`[data-id='${cartTestData[0].product.id}']`)
            expect(within(itemDiv).getByRole("textbox").value).toEqual(cartTestData[0].quantity.toString());
        });
    })

    it("Displays correct item pricing", async () => {
        const cartTestData = [
            {
                product: {
                    id: 1,
                    title: "Sample item",
                    price: 29.95,
                    rating: { count: 100 }
                },
                quantity: 65,
            }
        ]

        const context = {
            cart: cartTestData,
            setCart: () => [],
        }

        const routes = [{
            path: "/",
            element: <Outlet context={context} />,
            children: [
                {
                    path: "/cart",
                    element: <Cart />,
                }
            ]
        }];

        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/cart"] }
        );

        const { container } = render(<RouterProvider router={router} />);
        const productTotalPrice = cartTestData[0].product.price * cartTestData[0].quantity;

        await waitFor(() => {
            const itemDiv = container.querySelector(`[data-id='${cartTestData[0].product.id}']`)
            expect(within(itemDiv).getByText(productTotalPrice.toLocaleString())).toBeInTheDocument()
        });
    })
})

describe("Cart page quantity selector", () => {
    it("Updates cart to show correct item count and price", async () => {
        const cartTestData = [
            {
                product: {
                    id: 1,
                    title: "Sample item",
                    price: 29.95,
                    rating: { count: 100 }
                },
                quantity: 60,
            }
        ]

        const routes = [{
            path: "/",
            element: <AppMock initCart={cartTestData} />,
            children: [
                {
                    path: "/cart",
                    element: <Cart />,
                }
            ]
        }];

        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/cart"] }
        );

        const expectPriceFromQuantity = (quantity) => (cartTestData[0].product.price * quantity);
        const initialQuantity = cartTestData[0].quantity;

        const { container } = render(<RouterProvider router={router} />);
        const user = userEvent.setup();

        const itemDiv = container.querySelector(`[data-id='${cartTestData[0].product.id}']`)
        const quantityInput = within(itemDiv).getByRole("textbox");
        const increaseButton = within(itemDiv).getByRole("button", { name: "+" });
        const decreaseButton = within(itemDiv).getByRole("button", { name: "-" });

        await user.click(increaseButton);
        await waitFor(async () => {
            expect(within(itemDiv).getByText(expectPriceFromQuantity(initialQuantity + 1).toLocaleString())).toBeInTheDocument()
        });

        await user.click(increaseButton);
        await waitFor(async () => {
            expect(within(itemDiv).getByText(expectPriceFromQuantity(initialQuantity + 2).toLocaleString())).toBeInTheDocument()
        });

        await user.click(decreaseButton);
        await user.click(decreaseButton);
        await user.click(decreaseButton);
        await waitFor(async () => {
            expect(within(itemDiv).getByText(expectPriceFromQuantity(initialQuantity - 1).toLocaleString())).toBeInTheDocument()
        });

        await user.type(quantityInput, "{backspace}{backspace}37")
        await waitFor(async () => {
            expect(within(itemDiv).getByText(expectPriceFromQuantity(37).toLocaleString())).toBeInTheDocument()
        });

        await user.type(quantityInput, "11111")
        await waitFor(async () => {
            expect(within(itemDiv).getByText(expectPriceFromQuantity(100).toLocaleString())).toBeInTheDocument()
        });
    })
})