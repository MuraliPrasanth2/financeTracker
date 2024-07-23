import { useState } from "react";
import styles from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

const handleSubmit = (e, email, password, login) => {
    e.preventDefault();
    login(email, password);
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isPending, error, login } = useLogin();

    return (
        <form
            className={styles["login-form"]}
            onSubmit={(e) => handleSubmit(e, email, password, login)}
        >
            <legend>
                <h2>Login</h2>
            </legend>
            {error && <span className={styles.error}>{error}</span>}
            <label>
                <span>email:</span>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                />
            </label>
            {!isPending && <button className="btn">Login</button>}
            {isPending && (
                <button className="btn" disabled>
                    Login
                </button>
            )}
        </form>
    );
};

export default Login;
