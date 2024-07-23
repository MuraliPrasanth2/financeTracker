import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isCanceled, setIsCanceled] = useState(false);
    const { updateAuthState } = useAuthContext();

    const logout = async () => {
        try {
            if (!isCanceled) {
                setIsPending(true);
                setError(null);
            }
            await projectAuth.signOut();
            updateAuthState({ type: "LOGOUT" });
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

    return { logout, isPending, error };
};
