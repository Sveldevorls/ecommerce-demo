import { describe, it, expect } from 'vitest'
import { getByText, render, screen } from "@testing-library/react";
import App from './App';

describe("App module", () => {
    render(<App />);

    it("Successfully renders", () => {
        const title = screen.getByText(/Hello world/);
        
        expect(title).toBeInTheDocument();
    })
})