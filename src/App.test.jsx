import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from './router';

describe("App module", () => {
    it("Successfully renders", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/']
        });
        render(<RouterProvider router={router} />);

        expect(screen.getByText(/Sample shop/)).toBeInTheDocument();
    })
})