import styles from "./About.module.css";
import components from "../../components.module.css";

export default function About() {
    return (
        <div id="about" className={styles.about}>
            <h2 className={components.title}>About us</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam at quisquam mollitia officiis aut ratione non, corporis atque deserunt, ducimus eveniet, distinctio cum vitae veritatis modi perferendis doloremque nesciunt sunt?
            </p>
        </div>
    );
};