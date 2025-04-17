import { describe, it, expect } from 'vitest'
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer/Footer';

const routes = [
    {
        title: "Our products",
        children:
            [
                { title: "All products", path: "/products" },
            ]
    },
    {
        title: "About us",
        children:
            [
                { title: "About", path: "/about-us" },
            ]
    },
    {
        title: "Help",
        children:
            [
                { title: "Terms of service", path: "#" },
                { title: "Privacy policy", path: "#" },
                { title: "Contact information", path: "#" },
            ]
    },
    {
        title: "Cart",
        children:
            [
                { title: "My cart", path: "/cart" },
            ]
    },
]

describe("Footer module", () => {
    it.each(routes)("Renders every navigation link in order", (route) => {
        render(
            <MemoryRouter>
                <Footer/>
            </MemoryRouter>
        );

        const routeDiv = screen.getByText(route.title);
        const subRoutes = within(routeDiv.parentNode).getAllByRole("link");
        
        subRoutes.forEach((subRoute, index) => {
            expect(subRoute.textContent).toEqual(route.children[index].title);
        })
    })
})