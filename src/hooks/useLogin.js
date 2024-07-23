import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isUnMounted, setIsUnMounted] = useState(false);
    const { updateAuthState } = useAuthContext();

    const login = async (email, password) => {
        if (!isUnMounted) {
            setError(null);
            setIsPending(true);
        }

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            if (!res) {
                throw new Error("Couldn't complete signin");
            }

            updateAuthState({ type: "LOGIN", payload: res.user });
            if (!isUnMounted) {
                setIsPending(false);
                setError(null);
            }
        } catch (error) {
            if (!isUnMounted) {
                setError("email id or password is invalid");
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        setIsUnMounted(false);
        return () => setIsUnMounted(true);
    }, []);

    return { error, isPending, login };
};
