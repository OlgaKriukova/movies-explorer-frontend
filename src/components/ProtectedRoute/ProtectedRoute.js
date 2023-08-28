import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ProtectedRoute({ element: Component, ...props  }) {
    const currentUser = useContext(CurrentUserContext);

   console.log('currentUser.email = '+currentUser.email);

    return (
        currentUser.email ? <Component {...props} /> : <Navigate to="/" replace/>
    )
}
