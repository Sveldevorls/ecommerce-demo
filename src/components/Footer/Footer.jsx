import { Link } from "react-router-dom";

import "../../colors.css";
import styles from "./Footer.module.css";
import components from "../../components.module.css";


export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerTop}>
                <FooterNavbar />
                <div className={styles.newsletter}>
                    <h2>Subscribe to our newsletter</h2>
                    <span>We only send biweekly store updates and important announcements</span>
                    <div className={styles.inputContainer}>
                        <input
                            type="email"
                            name="newsletter-email"
                            id="newsletter-email"
                            placeholder="email address"
                        />
                        <button className={components.button}>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <span>Lipsum, 2025</span>
            </div>
        </div>
    );
};

function FooterNavbar() {
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
    ];

    return (
        <div className={styles.footerNavbar}>
            {routes.map((route, index) =>
                <div key={index}>
                    <h3>{route.title}</h3>
                    <ul>
                        {route.children.map((childRoute, index) =>
                            <li key={index}>
                                <Link to={childRoute.path}>{childRoute.title}</Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

