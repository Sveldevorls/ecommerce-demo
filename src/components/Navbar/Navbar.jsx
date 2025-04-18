import { Link, NavLink } from "react-router-dom";

import "../../colors.css";
import styles from "./Navbar.module.css";
import components from "../../components.module.css";

import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";

export default function Navbar({ cartItemCount }) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="Lipsum" />
                </Link>
            </div>
            <ul className={styles.links}>
                <li>
                    <NavLink to="/products">Our products</NavLink>
                </li>
                <li>
                    <NavLink to="/about-us">About us</NavLink>
                </li>
                <li>
                    <NavLink to="/help">Help</NavLink>
                </li>
            </ul>
            <div className={styles.cart}>
                <Link to="/cart">
                    <img src={cart} className={components.icon} alt="My cart" />
                    <span>{cartItemCount < 100 ? cartItemCount : "99+"}</span>
                </Link>
            </div>
        </nav>
    );
};