import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/checkout.css";

function Checkout() {
  const { items, totalPrice, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "card",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // Dummy checkout
    alert("Order placed successfully!");
    clear();
    navigate("/");
  };

  const disabled = items.length === 0;

  return (
    <div className="container" style={{ paddingBottom: 24 }}>
      <h2 className="section-title">Checkout</h2>
      <div className="card" style={{ padding: 18 }}>
        <form className="checkout-form" onSubmit={onSubmit}>
          <div className="row">
            <label style={{ flex: 1 }}>
              Full Name
              <input
                className="input"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label style={{ flex: 1 }}>
              Phone
              <input
                className="input"
                type="tel"
                pattern="[0-9]{10}"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </label>
          </div>

          <label>
            Address
            <input
              className="input"
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </label>
          <div className="row">
            <label style={{ flex: 1 }}>
              City
              <input
                className="input"
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </label>
            <label style={{ flex: 1 }}>
              Pincode
              <input
                className="input"
                type="text"
                pattern="[0-9]{6}"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                required
              />
            </label>
          </div>
          <label>
            Payment Method
            <select
              value={form.payment}
              onChange={(e) => setForm({ ...form, payment: e.target.value })}
              className="input"
            >
              <option value="card">Card (Dummy)</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI (Dummy)</option>
            </select>
          </label>
          <hr className="sep" />
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div style={{ color: "var(--muted)" }}>Total Payable</div>
            <div style={{ fontWeight: 800 }}>₹{totalPrice}</div>
          </div>
          <button className="button" type="submit" disabled={disabled}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
