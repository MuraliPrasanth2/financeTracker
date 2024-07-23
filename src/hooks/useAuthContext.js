import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error(
			"useAuthContext should be called inside a component that is inside the AuthContextProvider component.",
		);
	}

	return context;
};
