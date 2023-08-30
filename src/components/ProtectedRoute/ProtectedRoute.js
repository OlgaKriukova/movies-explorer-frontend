import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...props  }) {
    return (
        props.isRegistered ? <Component {...props} /> : <Navigate to="/" replace/>
    )
}
