import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/navbar.css";

function Navbar() {
  const { totalCount } = useCart();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label="MediCart Home">
          <span>💊</span>
          MediCart
        </Link>
        <div className="nav-links">
          <Link
            to="/medicines"
            className={location.pathname === "/medicines" ? "active" : ""}
          >
            Shop
          </Link>
          <Link to="/cart" className="cart-icon" aria-label="Cart">
            <span>🛒</span>
            {totalCount > 0 && <span className="badge">{totalCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
