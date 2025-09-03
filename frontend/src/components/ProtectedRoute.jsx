import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/auth";

export default function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const role = getRoleFromToken(token);
    console.log(role);
    
    if (!token || role !== allowedRole) {
        return <Navigate to="/login" />;
    }

    return children;
}