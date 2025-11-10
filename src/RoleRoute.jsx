import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const RoleRoute = ({ children, allowedRoles }) => {
    // Bypass authentication - allow access without login
    return children;
    
    // Original authentication code (commented out for bypass)
    /*
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("authUser"));

    const payload = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000)

    if (!token || !user || payload.exp <= now) {
        return <Navigate to="/login" replace />;
    }

    return allowedRoles.includes(user.role) ? children : <Navigate to="/login" replace />;
    */
};

export default RoleRoute;
