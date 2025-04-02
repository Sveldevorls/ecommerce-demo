import { describe, it, expect, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import Products from './Products';

vi.mock("react-router-dom", () => ({
    useLoaderData: vi.fn(),
}));

describe("Products module", () => {
    import("react-router-dom").then((router) => {
        router.useLoaderData.mockReturnValue([{ title: "Sample item" }]);
    });

    it("Displays fetched data", () => {
        render(<Products />);
        screen.debug();

        expect(screen.getByText("Sample item")).toBeInTheDocument();
    })
})