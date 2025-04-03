import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ProductPage from './ProductPage';

const routes = [{
    path: "/products/:productID",
    element: <ProductPage />,
    loader: ({ params }) =>
        params.productID == 0 ?
            { title: "Sample item", id: 0 } :
            null
}];


describe("ProductPage module", () => {
    it("Displays fetched data", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/0"] }
        );
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            screen.debug();
            expect(screen.getByText("Sample item")).toBeInTheDocument();
        });
    })

    it("Shows error page when data is wrong", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products/999"] }
        );
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            screen.debug();
            expect(screen.getByText(/Error/)).toBeInTheDocument();
        });
    })
})