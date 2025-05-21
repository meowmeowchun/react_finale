import { useState, useEffect } from "react";
import Header from "../components/Header";
import Email from "../components/Email";
import Footer from "../components/Footer";
import { useCartContext } from "../redux/CartContext";
import yamatoData from "../data/yamato";
import BackToTop from "../components/BackToTop.jsx";

const images = import.meta.glob("../assets/yamato/*.png", { eager: true });

const yamato = yamatoData.map((item, index) => {
  const imagePath = `../assets/yamato/yamato_${item.id}.png`;
  const image = images[imagePath]?.default || Object.values(images)[index]?.default;
  return { ...item, image };
});

function Yamato() {
  const { dispatch } = useCartContext();

  // State for modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Close modal on Esc key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null); // Close the modal
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setSelectedImage(null);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-neutral text-accent min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {yamato.map((product) => (
              <div
                key={product.id}
                className="bg-neutral rounded-2xl p-4 shadow hover:shadow-lg transition"
              >
                {/* Clickable Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-xl mb-4 cursor-pointer"
                  loading="lazy"
                  onClick={() => setSelectedImage(product.image)} // Open modal with selected image
                />
                <button
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        name: product.title,
                        price: product.price,
                        quantity: 1,
                        image: product.image,
                      },
                    });
                    dispatch({
                      type: "SET_NOTIFICATION",
                      payload: "1 item added to cart",
                    });
                  }}
                  className="mt-2 px-4 py-2 bg-accent text-neutral rounded hover:opacity-80"
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Full Image */}
      {selectedImage && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleOutsideClick} // Close modal when clicking outside
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-screen rounded"
            />
          </div>
        </div>
      )}
      <BackToTop />
      <Email />
      <Footer />
    </>
  );
}

export default Yamato;