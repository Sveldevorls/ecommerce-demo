import { describe, it, expect, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import ProductPage from './ProductPage';

vi.mock("react-router-dom", () => ({
    useLoaderData: vi.fn(),
}));

describe("ProductPage module", () => {
    import("react-router-dom").then((router) => {
        router.useLoaderData
        .mockReturnValueOnce({ title: "Sample item" })
        .mockReturnValueOnce(null);
    });

    it("Displays fetched data", () => {
        render(<ProductPage />);
        screen.debug();

        expect(screen.getByText("Sample item")).toBeInTheDocument();
    })

    it("Shows error page when data is wrong", () => {
        render(<ProductPage />);
        screen.debug();

        expect(screen.getByText(/Error/)).toBeInTheDocument();
    })
})