import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import App from './App';

describe("App module", () => {
    it("Successfully renders", () => {
        render(<App />);
        
        expect(screen.getByText(/Hello world/)).toBeInTheDocument();
    })
})