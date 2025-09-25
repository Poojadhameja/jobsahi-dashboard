import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("authUser"));

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return allowedRoles.includes(user.role) ? children : <Navigate to="/login" replace />;
};

export default RoleRoute;
