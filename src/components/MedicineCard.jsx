import React from "react";
import "../styles/medicines.css";
import { useCart } from "../context/CartContext.jsx";

function MedicineCard({ med, onAdded }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: med.id,
      name: med.name,
      price: med.price,
      image: med.image,
    });
    onAdded?.();
  };

  return (
    <div className="card medicard">
      <img src={med.image} alt={med.name} loading="lazy" />
      <div className="title">{med.name}</div>
      <div className="brand">
        {med.brand} - {med.category}
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="price">₹{med.price}</div>
        <div className={`stock ${med.inStock ? "in" : "out"}`}>
          {med.inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      <button
        className="button"
        onClick={handleAdd}
        disabled={!med.inStock}
        aria-disabled={!med.inStock}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default MedicineCard;
