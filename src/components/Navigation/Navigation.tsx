import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {

    const location = useLocation()

    return (
        <nav className="nav">
            <Link to="/" className={`nav__link ${location.pathname === "/" ? "active" : ""}`}>
                Главная
            </Link>
            <Link to="/admin" className={`nav__link ${location.pathname === "/admin" ? "active" : ""}`}>
                Админка
            </Link>
        </nav>
    );
};
