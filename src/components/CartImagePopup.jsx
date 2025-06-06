// components/CartImagePopup.jsx
import React from "react";

export default function CartImagePopup({ show, image = "/cart-added.png" }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
      <img
        src={image}
        alt="Added to cart"
        className="w-24 h-24 animate-popOnce drop-shadow-xl"
      />
    </div>
  );
}
