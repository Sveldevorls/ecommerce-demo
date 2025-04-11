import { Link, NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import logo from "../../assets/logo.png"
import cart from "../../assets/cart.svg"

export default function Navbar({ cartItemCount }) {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.logo}>
                <img src={logo} alt="Lipsum" />
            </NavLink>
            <ul>
                <li>
                    <Link to="/products">Our products</Link>
                </li>
                <li>
                    <Link to="#">About us</Link>
                </li>
                <li>
                    <Link to="#">Help</Link>
                </li>
            </ul>
            <div className={styles.cart}>
                <Link to="/cart">
                    <img src={cart} className={styles.icon} alt="My cart" />
                    <span>{cartItemCount < 100 ? cartItemCount : "99+"}</span>
                </Link>
            </div>
        </nav>
    )
}