import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../redux/CartContext";

import fanart from "../data/fanart";
import fullart from "../data/fullart";
import sketch from "../data/sketch";
import yamato from "../data/yamato";

import Comment from "../components/Comment.jsx";
import Header from "../components/Header.jsx";
import CartImagePopup from "../components/CartImagePopup.jsx";
import DotGrid from "../blocks/Backgrounds/DotGrid/DotGrid.jsx";

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
  const [showCartImage, setShowCartImage] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      setShowCartImage(true);
      setTimeout(() => setShowCartImage(false), 1500);
    }
  };

  if (!product) return <div className="text-center mt-10">找不到這個商品。</div>;

  return (
    <>
      <Header />
      <CartImagePopup show={showCartImage} />

      <div className="min-h-screen bg-neutral text-accent p-6">
        <div className="max-w-[95vw] md:max-w-[90vw] mx-auto card bg-neutral shadow-xl">
          {/* 主要內容區塊 */}
          <figure className="p-6 flex flex-col md:flex-row gap-6">
            {/* 左邊圖片 */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.title}
                className="rounded-xl cursor-pointer max-h-[60vh] md:max-h-[80vh] object-contain"
                onClick={() => setModalOpen(true)}
              />
            </div>

            {/* 右邊商品敘述 */}
            <div className="w-full md:w-1/2 p-4 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-primary font-light text-4xl md:text-6xl font-[Girassol]">
                  {product.title}
                </h2>
                <span className="block font-light font-[Girassol] text-2xl md:text-3xl mt-2">
                  ${product.price}
                </span>
              </div>

              <div className="mt-6 w-full h-[200px] md:h-[300px] relative">
                <DotGrid
                  dotSize={5}
                  gap={9}
                  baseColor="#808080"
                  activeColor="#ff0000"
                  proximity={120}
                  shockRadius={250}
                  shockStrength={5}
                  resistance={750}
                  returnDuration={1.5}
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary font-[Girassol] text-xl md:text-2xl font-light w-full md:w-auto 
                           transition transform active:scale-95 duration-100 ease-in-out"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </figure>

          {/* 留言區 */}
          <div className="card-body">
            <div className="mt-8 max-w-4xl mx-auto w-full">
              <Comment productId={`${type}-${id}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal 圖片放大 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-neutral bg-opacity-70 z-50 flex items-center justify-center">
          <div
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 cursor-pointer"
          ></div>
          <img
            src={product.image}
            alt={product.title}
            className="z-50 max-h-[90vh] max-w-full shadow-lg"
          />
        </div>
      )}
    </>
  );
}

export default Product;
