import { Link } from "react-router-dom";

import styles from "./Home.module.css";
import components from "../../components.module.css";


export default function Home() {
    const fakeDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" })
        .format(new Date((new Date).getTime() + 1000 * 60 * 60 * 24 * 7));

    return (
        <div id="home">
            <div className={components.announcementBanner}>
                <h2>2 year anniversary event - free worldwide shipping until {fakeDate}</h2>
            </div>
            <div className={styles.bannerContainer}>
                <div className={styles.bannerContent}>
                    <h1>Lorem ipsum</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, tempore deleniti dicta ex perferendis libero provident? Ipsum, dolores odit cupiditate aspernatur fuga, consectetur, vel voluptatem accusantium fugiat provident voluptas! Enim.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea nesciunt maxime inventore. Dolore minima nam fugiat veniam consequatur quod numquam amet iure, natus deserunt fugit ducimus recusandae labore blanditiis exercitationem?
                    </p>
                    <Link to="/products" className={`${components.button} ${styles.bannerButton}`}>
                        Shop now
                    </Link>
                </div>
            </div>
            <div className={`${components.card} ${styles.infoCard}`}>
                <div className={styles.infoCardImage}></div>
                <div className={styles.infoCardContent}>
                    <h2>Lorem ipsum</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ipsa velit ad eos numquam aut aliquam provident architecto necessitatibus, inventore tempore impedit excepturi nulla ipsam. Corrupti obcaecati corporis voluptatum beatae.
                    </p>
                    <Link to="/about-us" className={components.button}>
                        Learn more
                    </Link>
                </div>
            </div>
        </div>
    );
};