import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="navbar-brand">
            🛒LUX WATCH
          </Link>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <div className="dropdown">
            <button className="dropdown-toggle">Categories</button>
            <div className="dropdown-menu">
              <NavLink to="/categories" className="dropdown-item">
                All Categories
              </NavLink>
              {categories?.map((category) => (
                <NavLink
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="dropdown-item"
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>

          {!auth?.user ? (
            <>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          ) : (
            <div className="dropdown">
              <button className="dropdown-toggle">{auth?.user?.name}</button>
              <div className="dropdown-menu">
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="dropdown-item"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  className="dropdown-item"
                >
                  Logout
                </NavLink>
              </div>
            </div>
          )}

          <li className="nav-item">
            <Badge count={cart?.length} showZero>
              <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>
            </Badge>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Header;
