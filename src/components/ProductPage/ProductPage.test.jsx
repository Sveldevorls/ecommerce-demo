import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import ProductPage from './ProductPage';
import userEvent from '@testing-library/user-event';

const routes = [{
    path: "/",
    element: <Outlet context={{ cart: [], setCart: () => [] }} />,
    children: [
        {
            path: "/products/:productID",
            element: <ProductPage />,
            loader: ({ params }) =>
                params.productID == 0 ?
                    { title: "Sample item", id: 0 } :
                    null
        }   
    ]
}];

describe("ProductPage module", () => {
    it("Displays fetched data", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/0"] }
        );
        render(
            <RouterProvider router={router} />
        );

        await waitFor(() => {
            expect(screen.getByText("Sample item")).toBeInTheDocument();
        });
    })

    it("Calls the cart adder function when button is clicked", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/0"] }
        );
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        await waitFor(async () => {
            const button = screen.getByRole("button");
            expect(button).toBeInTheDocument();
            await user.click(button);
            expect(screen.getByText(/Added to cart/i)).toBeInTheDocument();
        });
    })

    it("Shows error page when data is wrong", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/999"] }
        );
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.getByText(/Error/)).toBeInTheDocument();
        });
    })
})