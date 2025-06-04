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
        <div className="max-w-[95vw] md:max-w-[90vw] mx-auto card bg-base-100 shadow-xl ">

          <figure className="flex flex-col md:flex-row items-stretch p-6 gap-6 bg-neutral">
            {/* 左邊圖片區 */}
            <div className="w-full md:w-[40%] shrink-0">
              <div className="h-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-xl cursor-pointer w-full h-full object-contain"
                  onClick={() => setModalOpen(true)}
                />
              </div>
            </div>

            {/* 右邊內容區 */}
            <div className="flex-1 bg-neutral p-4 rounded-xl flex flex-col justify-between">
              <div>
                <h2 className="text-primary font-bold text-6xl font-[Girassol]">
                  {product.title}
                </h2>
                <span className="block mt-2 font-bold font-[Girassol] text-4xl">
                  ${product.price}
                </span>
                <p className="mt-4">{product.description || "這是作品介紹。"}</p>
              </div>
              <div className="mt-6 self-end">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary font-[Girassol] text-3xl font-light"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </figure>




          <div className="card-body">


            {/* 👉 留言區 */}
            <div className="mt-8">
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
