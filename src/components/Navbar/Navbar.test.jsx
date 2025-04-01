import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import Navbar from './Navbar';

describe("Navbar module", () => {
    it ("shows correct cart item count", () => {
        const itemCount = 5;
        render(<Navbar cartItemCount={itemCount}/>);
        expect(screen.getByText(itemCount.toString())).toBeInTheDocument();
    })
})