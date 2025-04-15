import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import Cart from './Cart';
import AppMock from '../AppMock';
import userEvent from '@testing-library/user-event';
import Decimal from 'decimal.js';

import { testCart } from '../../test-data';

// Mocking dialog because it's not been supported yet
HTMLDialogElement.prototype.show = vi.fn(function mock() {
    this.open = true;
});
HTMLDialogElement.prototype.showModal = vi.fn(function mock() {
    this.open = true;
});
HTMLDialogElement.prototype.close = vi.fn(function mock() {
    this.open = false;
});

const priceFormatter = Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

describe("Cart page", () => {
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

        expect(await screen.findByText(/empty/)).toBeInTheDocument();
    })

    it.each(testCart)("Displays correct item count", async (cartEntry) => {
        const context = {
            cart: testCart,
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

        const itemDiv = container.querySelector(`[data-productid='${cartEntry.product.id}']`)
        expect(within(itemDiv).getByRole("textbox").value).toEqual(cartEntry.quantity.toString());
    })

    it.each(testCart)("Displays correct item pricing", async (cartEntry) => {
        const context = {
            cart: testCart,
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

        const productPrice = priceFormatter.format(Decimal(cartEntry.product.price).mul(cartEntry.quantity).toNumber());

        const { container } = render(<RouterProvider router={router} />);

        const itemDiv = container.querySelector(`[data-productid='${cartEntry.product.id}']`)
        expect(within(itemDiv).getByText(productPrice)).toBeInTheDocument()
    })
})

describe("Cart page quantity selector", () => {
    it.each(testCart)("Updates cart to show correct item count and price", async (cartEntry) => {
        const routes = [{
            path: "/",
            element: <AppMock initCart={testCart} />,
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

        const expectedPriceFromQuantity = (quantity) =>
            priceFormatter.format(
                Decimal(cartEntry.product.price)
                    .mul(quantity)
                    .toNumber()
            );

        const user = userEvent.setup();
        const initialQuantity = cartEntry.quantity;

        const { container } = render(<RouterProvider router={router} />);

        const itemDiv = container.querySelector(`[data-productid='${cartEntry.product.id}']`)
        const quantityInput = within(itemDiv).getByRole("textbox");
        const increaseButton = within(itemDiv).getByRole("button", { name: "+" });
        const decreaseButton = within(itemDiv).getByRole("button", { name: "-" });

        await user.click(increaseButton);
        expect(within(itemDiv).getByText(expectedPriceFromQuantity(initialQuantity + 1))).toBeInTheDocument()

        await user.click(increaseButton);
        expect(within(itemDiv).getByText(expectedPriceFromQuantity(initialQuantity + 2))).toBeInTheDocument()

        await user.click(decreaseButton);
        await user.click(decreaseButton);
        await user.click(decreaseButton);
        expect(within(itemDiv).getByText(expectedPriceFromQuantity(initialQuantity - 1))).toBeInTheDocument()

        await user.type(quantityInput, "{backspace}{backspace}37")
        expect(within(itemDiv).getByText(expectedPriceFromQuantity(37))).toBeInTheDocument()

        await user.type(quantityInput, "11111")
        expect(within(itemDiv).getByText(expectedPriceFromQuantity(100))).toBeInTheDocument()
    })
})

describe("Cart entry remove button", () => {
    it.each(testCart)("Shows and closes remove confirmation modal when clicked", async (cartEntry) => {
        const routes = [{
            path: "/",
            element: <AppMock initCart={testCart} />,
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

        const user = userEvent.setup();

        const itemDiv = container.querySelector(`[data-productid='${cartEntry.product.id}']`)
        const removeDialog = container.querySelector("dialog");
        const removeButton = within(itemDiv).getByRole("button", { name: "Remove" });

        await user.click(removeButton);
        expect(removeDialog).toBeVisible();

        const closeButton = screen.getByRole("button", { name: "Cancel" });
        await user.click(closeButton);
        expect(removeDialog).not.toBeVisible();
    })

    // works but dialog is not well supported in testing
    /*     
        it.each([testCart[0]])("Shows the item being removed", async (cartEntry) => {
            const routes = [{
                path: "/",
                element: <AppMock initCart={testCart} />,
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
    
            const user = userEvent.setup();
    
            const itemDiv = container.querySelector(`[data-productid='${cartEntry.product.id}']`)
            const removeDialog = container.querySelector("dialog");
            const removeButton = within(itemDiv).getByRole("button", { name: "Remove" });
    
            await user.click(removeButton);
            expect(removeDialog).toBeVisible();
            expect(within(removeDialog).getByText(cartEntry.product.title)).toBeInTheDocument();
            expect(within(removeDialog).getByAltText("Item image")).toBeInTheDocument();
        })
    
    
        it.each(testCart)("Removes cart entry when clicked", async (cartEntry) => {
            const routes = [{
                path: "/",
                element: <AppMock initCart={testCart} />,
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
        
            const user = userEvent.setup();
    
            const itemDiv = container.querySelector(`[data-productid='${cartEntry.product.id}']`)
            const removeButton = within(itemDiv).getByRole("button", {name: "Remove"});
    
            await user.click(removeButton);
            const confirmButton = container.querySelector("#confirm");
            await user.click(confirmButton);
            screen.debug()
            expect(screen.queryByText(cartEntry.product.title)).not.toBeInTheDocument();
        })
    */
})