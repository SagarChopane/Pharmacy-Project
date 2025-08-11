import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/cart.css";

function Cart() {
  const { items, increment, decrement, remove, totalPrice } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container" style={{ paddingBottom: 24 }}>
      <h2 className="section-title">Your Cart</h2>
      <div className="cart-page">
        <div className="card">
          {items.length === 0 ? (
            <div className="empty">
              Cart is empty.{" "}
              <Link to="/medicines" style={{ color: "var(--primary)" }}>
                Shop now
              </Link>
            </div>
          ) : (
            <div className="grid" style={{ gap: 16 }}>
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    <div style={{ color: "var(--muted)" }}>₹{item.price}</div>
                    <div className="row" style={{ marginTop: 8 }}>
                      <div className="qty">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => decrement(item.id)}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => increment(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="button danger"
                        onClick={() => remove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700 }}>
                    ₹{item.qty * item.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card summary">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div style={{ color: "var(--muted)" }}>Subtotal</div>
            <div>₹{totalPrice}</div>
          </div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div style={{ color: "var(--muted)" }}>Shipping</div>
            <div>₹0</div>
          </div>
          <hr className="sep" />
          <div
            className="row"
            style={{ justifyContent: "space-between", fontWeight: 800 }}
          >
            <div>Total</div>
            <div>₹{totalPrice}</div>
          </div>
          <button
            className="button"
            disabled={items.length === 0}
            onClick={goCheckout}
            style={{ width: "100%", marginTop: 12 }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
