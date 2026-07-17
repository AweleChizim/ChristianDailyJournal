import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/login/LoginPage";
import Signup from "./features/signup/SignupPage";

import Dashboard from "./features/dashboard/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import JournalPage from "./features/journal/JournalPage";
import GratitudePage from "./features/gratitude/GratitudePage";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { restoreSession } from "./api/authApi";
import toast from "react-hot-toast";


export default function App() {
    const navigate = useNavigate();
    useEffect(() => {
        restoreSession(() => {
            toast("Your session has expired. Please log in again.");
            navigate("/login");
        });
    }, []);
    return (
        <Routes>

            {/* Redirect */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Public */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            {/* Protected */}

            <Route element={<ProtectedRoute />}>

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/journal"
                        element={<JournalPage />}
                    />

                    <Route
                        path="/gratitudes"
                        element={<GratitudePage />}
                    />

                </Route>

            </Route>

        </Routes>
    );
}