import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isUser, children }) => {
    if (isUser === false) {
        return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoutes;