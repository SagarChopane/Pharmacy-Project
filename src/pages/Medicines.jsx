import React, { useMemo, useState } from "react";
import medicines from "../data/medicinesData.js";
import MedicineCard from "../components/MedicineCard.jsx";
import Toast from "../components/Toast.jsx";
import "../styles/medicines.css";

function uniqueVals(arr, key) {
  return Array.from(new Set(arr.map((x) => x[key]))).sort();
}

function Medicines() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [sort, setSort] = useState("relevance");
  const [toastMsg, setToastMsg] = useState("");

  const categories = useMemo(
    () => ["All", ...uniqueVals(medicines, "category")],
    []
  );
  const brands = useMemo(() => ["All", ...uniqueVals(medicines, "brand")], []);

  const minPrice = 0;
  const maxPrice = 250;

  const filtered = useMemo(() => {
    let data = medicines.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter((m) => m.name.toLowerCase().includes(q));
    }

    if (category !== "All") {
      data = data.filter((m) => m.category === category);
    }

    if (brand !== "All") {
      data = data.filter((m) => m.brand === brand);
    }

    data = data.filter(
      (m) => m.price >= priceRange[0] && m.price <= priceRange[1]
    );

    if (inStockOnly) {
      data = data.filter((m) => m.inStock);
    }

    if (sort === "price-asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") data.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") data.sort((a, b) => a.name.localeCompare(b.name));

    return data;
  }, [query, category, brand, inStockOnly, priceRange, sort]);

  const handleCardAdded = () => {
    setToastMsg("Added to cart!");
  };

  return (
    <div className="container" style={{ paddingBottom: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          gap: "16px",
        }}
      >
        {/* Filters Column — sticky beside products */}
        <div className="filters">
          <input
            className="input search"
            type="text"
            placeholder="Search medicines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search medicines by name"
          />

          <label>
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Brand
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span style={{ color: "var(--muted)" }}>₹{priceRange[0]}</span>
            <input
              className="slider"
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
            <input
              className="slider"
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
            <span style={{ color: "var(--muted)" }}>₹{priceRange[1]}</span>
          </div>

          <label className="row">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span style={{ color: "var(--muted)" }}>In Stock only</span>
          </label>

          <label>
            Sort
            <select
              className="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </label>

          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setBrand("All");
              setInStockOnly(false);
              setPriceRange([minPrice, maxPrice]);
              setSort("relevance");
            }}
          >
            Reset
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid responsive">
          {filtered.length === 0 ? (
            <div className="empty card">No results found</div>
          ) : (
            filtered.map((med) => (
              <MedicineCard key={med.id} med={med} onAdded={handleCardAdded} />
            ))
          )}
        </div>
      </div>

      {/* Toast */}
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
    </div>
  );
}

export default Medicines;
