import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Products from './Products';

const routes = [{
    path: "/products",
    element: <Products />,
    loader: () => [{ title: "Sample item", id: 0 }],
}];

describe("Products module", () => {
    it("Displays products", async () => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products"]}
        );
        render(<RouterProvider router={router} />);

        await waitFor(() => {
            screen.debug();
            expect(screen.getByText("Sample item")).toBeInTheDocument();
        });
    })
})