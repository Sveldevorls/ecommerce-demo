import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Products from './Products';
import { testProductArray } from '../../test-data';

const routes = [{
    path: "/products",
    element: <Products />,
    loader: () => testProductArray,
}];

const formatPrice = price => Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)

describe("Products module", () => {
    it.each(testProductArray)("Displays product details in cards", async (product) => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products"]}
        );
        render(<RouterProvider router={router} />);

        expect(await screen.findByText(product.title)).toBeInTheDocument();
        expect(await screen.findByText(formatPrice(Number(product.price)))).toBeInTheDocument();
        expect((await screen.findAllByAltText("Product image")).length).toBe(2);
    })
})