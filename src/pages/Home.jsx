import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="fullscreen">
      <div className="container hero">
        <h1>Welcome to MediCart</h1>
        <p>
          Your one-stop shop for medicines and wellness essentials. Explore a
          curated list of products with simple filters, fast search, and a
          smooth checkout.
        </p>
        <div className="cta">
          <Link to="/medicines" className="button">
            Shop Now
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="/shopping-cart-with-pill-foils-copy-space.jpg"
            alt="Medicine shopping illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
