import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./features/dashboard/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import JournalPage from "./features/journal/JournalPage";
import GratitudePage from "./features/gratitude/GratitudePage";


export default function App() {
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