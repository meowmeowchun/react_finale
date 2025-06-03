import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "../redux/CartContext";

import fanart from "../data/fanart";
import fullart from "../data/fullart";
import sketch from "../data/sketch";
import yamato from "../data/yamato";

import Comment from "../components/Comment.jsx";
import Header from "../components/Header.jsx";

const datasets = {
  fanart,
  fullart,
  sketch,
  yamato,
};

function Product() {
  const { type, id } = useParams();
  const data = datasets[type];
  const product = data?.find((item) => String(item.id) === id);

  const { dispatch } = useCartContext();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  if (!product) return <div className="text-center mt-10">找不到這個商品。</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral text-accent p-6">
        <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl">
          <figure className="p-6">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-xl cursor-pointer"
              onClick={() => setModalOpen(true)}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-primary">{product.title}</h2>
            <p className="text-base-content">{product.description || "這是作品介紹。"}</p>
            <div className="card-actions justify-end items-center mt-4 gap-4">
              <span className="text-lg font-bold">${product.price}</span>
              <button onClick={handleAddToCart} className="btn btn-primary font-[Girassol]">
                ADD TO CART
              </button>
            </div>

            {/* 👉 留言區 */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">留言區</h3>
              <Comment productId={`${type}-${id}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal 圖片放大 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 cursor-pointer"
          ></div>
          <img
            src={product.image}
            alt={product.title}
            className="z-50 max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}

export default Product;
