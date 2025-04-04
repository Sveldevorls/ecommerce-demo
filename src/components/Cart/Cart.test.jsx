import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import Cart from './Cart';

const cart = [
    {
        id: 0,
        details: {
            title: "Sample item",
        },
        quantity: 1,
    }
]

const context = {
    cart: cart,
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

describe("ProductPage module", () => {
    it("Displays cart items", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/cart"] }
        );
        render(
            <RouterProvider router={router} />
        );

        await waitFor(() => {
            expect(screen.getByText("Sample item")).toBeInTheDocument();
            expect(screen.getByText("1")).toBeInTheDocument();
        });
    })
})