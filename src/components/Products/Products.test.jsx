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

describe("Products module", () => {
    it.each(testProductArray.map(product => product.title))("Displays products", async (productTitle) => {
        const router = createMemoryRouter(
            routes,
            { initialEntries: ["/products"]}
        );
        render(<RouterProvider router={router} />);

        expect(await screen.findByText(productTitle)).toBeInTheDocument();
    })
})