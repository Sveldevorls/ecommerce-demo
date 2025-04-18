import { Link, NavLink, useLocation } from "react-router-dom";

import "../../colors.css";
import styles from "./Navbar.module.css";
import components from "../../components.module.css";

import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import menu from "../../assets/menu.svg";
import { useEffect, useRef } from "react";

export default function Navbar({ cartItemCount }) {
    const navbarNarrowContentsRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (navbarNarrowContentsRef.current) {
            navbarNarrowContentsRef.current.style.display = "none";
            navbarNarrowContentsRef.current.style["grid-template-rows"] = "0fr";
            setTimeout(() => {
                navbarNarrowContentsRef.current.style.display = "grid";
            }, 1);
        }
    }, [location]);

    function handleNavMenuClick() {
        navbarNarrowContentsRef.current.style["grid-template-rows"] == "0fr" ?
            navbarNarrowContentsRef.current.style["grid-template-rows"] = "1fr" :
            navbarNarrowContentsRef.current.style["grid-template-rows"] = "0fr"
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarWide}>
                <div className={styles.navbarLogo}>
                    <Link to="/">
                        <img src={logo} alt="Lipsum" />
                    </Link>
                </div>
                <ul className={styles.navbarLinks}>
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
                <div className={styles.navbarCart}>
                    <Link to="/cart">
                        <img
                            src={cart}
                            className={components.icon}
                            alt="My cart"
                        />
                        <span>{cartItemCount < 100 ? cartItemCount : "99+"}</span>
                    </Link>
                </div>
            </div>

            <div className={styles.navbarNarrow}>
                <div className={styles.navbarNarrowTop}>
                    <div className={styles.navbarLogo}>
                        <Link to="/">
                            <img src={logo} alt="Lipsum" />
                        </Link>
                    </div>
                    <div className={styles.navbarNarrowMenu} onClick={handleNavMenuClick}>
                        <img
                            src={menu}
                            className={`${components.iconLarge} ${styles.navbarNarrow}`}
                            alt="Menu"
                        />
                    </div>
                </div>
                <div className={styles.navbarNarrowContentsContainer} ref={navbarNarrowContentsRef}>
                    <div className={styles.navbarNarrowContents} >
                        <ul className={styles.navbarNarrowLinks}>
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
                        <div className={styles.navbarCart}>
                            <Link to="/cart">
                                <img
                                    src={cart}
                                    className={components.icon}
                                    alt="My cart"
                                />
                                <span>{cartItemCount < 100 ? cartItemCount : "99+"}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};