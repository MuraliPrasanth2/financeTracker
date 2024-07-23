import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);
    const { updateAuthState } = useAuthContext();

    const signup = async (email, password, displayName) => {
        if (!isCanceled) {
            setError(null);
            setIsPending(true);
        }

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(
                email,
                password,
            );

            if (!res) {
                throw new Error("Couldn't complete signup");
            }

            await res.user.updateProfile({ displayName });
            updateAuthState({ type: "LOGIN", payload: res.user });
            if (!isCanceled) {
                setIsPending(false);
                setError(null);
            }
        } catch (error) {
            if (!isCanceled) {
                setError(error.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        setIsCanceled(false);
        return () => setIsCanceled(true);
    }, []);

    return { error, isPending, signup };
};
