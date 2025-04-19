import components from "../../components.module.css";
import "../../colors.css"
import styles from "./Errors.module.css";
import { Link, useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div id="error" className={styles.notFound}>
            <div>
                <h2 className={components.title}>404</h2>
                <p>The page you tried to access does not seem to exist.</p>
            </div>
            <div className={styles.notFoundLinks}>
                <a href="#" onClick={() => navigate(-1)}>Click here to go back to the previous page</a>
                <Link to="/">Click here to go to homepage</Link>
            </div>
        </div>
    );
};

export function ProductNotFound() {
    const navigate = useNavigate();

    return (
        <div id="error" className={styles.productNotFound}>

            <div>
                <h2 className={components.title}>404</h2>
                <p>The product you tried to access does not exist.</p>
            </div>
            <div className={styles.notFoundLinks}>
                <a href="#" onClick={() => navigate(-1)}>Click here to go back to the previous page</a>
                <Link to="/products">Click here for to see all products</Link>
            </div>
        </div>
    );
};