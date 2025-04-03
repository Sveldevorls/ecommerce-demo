import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';


describe("Navbar module", () => {
    it("shows correct cart item count", () => {
        const itemCount = 5;
        render(
            <MemoryRouter>
                <Navbar cartItemCount={itemCount} />
            </MemoryRouter>
        );
        screen.debug();
        expect(screen.getByText(itemCount.toString())).toBeInTheDocument();
    })
})