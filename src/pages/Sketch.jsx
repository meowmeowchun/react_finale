import { useState, useEffect } from "react";
import Header from "../components/Header";
import Email from "../components/Email";
import Footer from "../components/Footer";
import { useCartContext } from "../redux/CartContext";
import sketches from "../data/sketch.js";
import BackToTop from "../components/BackToTop.jsx";
import { Link } from "react-router-dom"
import CartImagePopup from "../components/CartImagePopup";


function Sketch() {
  const { dispatch } = useCartContext();
  const [showCartImage, setShowCartImage] = useState(false);

  const handleAddToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",  
      payload: {
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      },
    });
    setShowCartImage(true);
    setTimeout(() => setShowCartImage(false), 1500);
  };

  return (
    <>
      <Header />
      <CartImagePopup show={showCartImage} />
      <div className="bg-neutral text-accent min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sketches.map((product) => (
              <div
                key={product.id}
                className="bg-neutral rounded-2xl p-4 shadow hover:shadow-lg transition"
              >
                {/* Clickable Image */}
                <Link to={`/product/sketch/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-xl mb-4 cursor-pointer"
                    loading="lazy"
                  />
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 px-4 py-2 bg-accent text-neutral rounded hover:opacity-80 transition active:scale-95"
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BackToTop />
      <Email />
      <Footer />
    </>
  );
}

export default Sketch;