import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ProtectedRoute({ element: Component, ...props  }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        currentUser.email ? <Component {...props} /> : <Navigate to="/" replace/>
    )
}
