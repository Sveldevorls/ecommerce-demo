import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

export default function Navbar({ cartItemCount = 0 }) {
    return (
        <nav className={styles.Navbar}>
            <ul>
                <li>
                    <Link to="./products">Our products</Link>
                </li>
                <li>About us</li>
                <li>Help</li>
                <li>
                    <Link to="./cart">My cart</Link>
                </li>
            </ul>
            <p className={styles.cart}>
                {cartItemCount}
            </p>
        </nav>
    )
}