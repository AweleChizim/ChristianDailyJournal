import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

export default function ProtectedRoute() {

    const token = localStorage.getItem("access_token");

    if (!token) {

        return <Navigate to="/" replace />;

    }

    try {

        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.exp * 1000 <= Date.now()) {

            localStorage.removeItem("access_token");
            localStorage.removeItem("user");

            return <Navigate to="/" replace />;

        }

    } catch {

        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        return <Navigate to="/" replace />;

    }

    return <Outlet />;

}