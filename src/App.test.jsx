import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from './router';

Element.prototype.scrollTo = () => {};

describe("App module", () => {
    it("Successfully renders", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/']
        }); 
        render(<RouterProvider router={router} />);

        expect(screen.getByText("Lipsum")).toBeInTheDocument();
    })

    it("Shows 404 page when element does not exist", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/fake-path']
        }); 
        render(<RouterProvider router={router} />);

        expect(screen.getByText("404")).toBeInTheDocument();
    })

    it("Shows 404 page product does not exist", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/products/9999999']
        }); 
        render(<RouterProvider router={router} />);

        expect(await screen.findByText("404")).toBeInTheDocument();
    })
})