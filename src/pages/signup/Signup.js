import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import styles from "./Signup.module.css";

const handleSubmit = (e, email, password, displayName, signup) => {
    e.preventDefault();
    signup(email, password, displayName);
};

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const { signup, isPending, error } = useSignup();

    return (
        <form
            className={styles["signup-form"]}
            onSubmit={(e) => handleSubmit(e, email, password, displayName, signup)}
        >
            <legend>
                <h2>Signup</h2>
            </legend>
            {error && <span className="error">{error}</span>}
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
            <label>
                <span>display name:</span>
                <input
                    type="text"
                    name="name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    id="name"
                />
            </label>
            {!isPending && <button className="btn">Signup</button>}
            {isPending && (
                <button className="btn" disabled>
                    Loading...
                </button>
            )}
        </form>
    );
};

export default Signup;
