import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();
    return (
        <div>
            <nav className={styles.navbar}>
                <ul>
                    <li className={styles.title}>
                        <Link to="/">
                            <h1>myMoney</h1>
                        </Link>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>Hello, {user.displayName}</li>
                            <li>
                                {!isPending && (
                                    <button className="btn" onClick={logout}>
                                        Logout
                                    </button>
                                )}
                                {isPending && (
                                    <button className="btn" disabled>
                                        Logout
                                    </button>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
