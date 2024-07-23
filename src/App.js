import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
    const { user, authIsReady } = useAuthContext();

    if (!authIsReady) {
        return <></>;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            user ? (
                                <Home />
                            ) : (
                                <Navigate to="/login" state={{ from: "/" }} replace />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            !user ? (
                                <Signup />
                            ) : (
                                <Navigate to="/" state={{ from: "/signup" }} replace />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !user ? (
                                <Login />
                            ) : (
                                <Navigate to="/" state={{ from: "/login" }} replace />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
