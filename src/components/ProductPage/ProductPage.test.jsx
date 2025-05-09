import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// test data
import ProductPage from './ProductPage';
import AppMock from '../AppMock';
import { testProduct } from '../../test-data';

const cartAddSuccessMessage = "Added to cart";
const cartAddFailMessage = "Can't add more to cart";
const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)

describe("Product page display", () => {
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
                    params.productID == 1 ?
                        testProduct :
                        null
            }
        ]
    }];

    // Success case
    it("Shows item details", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/1"] }
        );
        render(<RouterProvider router={router} />);

        expect(await screen.findByText(testProduct.title)).toBeInTheDocument();
        expect(await screen.findByText(testProduct.description)).toBeInTheDocument();
        expect(await screen.findByText(testProduct.rating.rate)).toBeInTheDocument();
        expect(await screen.findByText(formatPrice(Number(testProduct.price)))).toBeInTheDocument();
        expect(await screen.findByAltText(testProduct.title)).toBeInTheDocument();
        
    })

    it("Shows correct remaining item count", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/1"] }
        );

        render(<RouterProvider router={router} />);

        expect(await screen.findByText(`${testProduct.rating.count} items left in stock`)).toBeInTheDocument();
    })
})

describe("Product page cart adding function", () => {
    const routes = [{
        path: "/",
        element: <AppMock />,
        children: [
            {
                path: "/products/:productID",
                element: <ProductPage />,
                loader: ({ params }) =>
                    params.productID == 1 ?
                        testProduct :
                        null
            }
        ]
    }];

    it("Calls cart adder function when button is clicked", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/1"] }
        );
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);
        const button = await screen.findByRole("button", { name: "Add to cart" });

        await user.click(button);
        expect(screen.getByText(cartAddSuccessMessage)).toBeInTheDocument();
    })

    it("Stops item being added if the result quantity is larger than the current stock", async () => {
        // maximum quantity = 100

        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/1"] }
        );
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);
        const button = await screen.findByRole("button", { name: "Add to cart" });
        const quantityInput = await screen.findByRole("textbox");

        await user.type(quantityInput, "{backspace}50");
        expect(quantityInput.value).toEqual("50");

        await user.click(button); // 50
        expect(screen.queryByText(cartAddFailMessage)).not.toBeInTheDocument();

        await user.click(button); // 100
        expect(screen.queryByText(cartAddFailMessage)).not.toBeInTheDocument();

        await user.click(button); // 150 -> fail
        expect(screen.getByText(cartAddFailMessage)).toBeInTheDocument();
    })
})