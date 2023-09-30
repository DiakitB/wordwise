import { Link } from "react-router-dom";
import styles from "./AppNav.module.css";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="cities">Cities</Link>
        </li>
        <li>
          <Link to="countries">Country</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
