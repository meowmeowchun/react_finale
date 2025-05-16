// Cart.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import Email from "../components/Email";
import { useCartContext } from "../redux/CartContext"; // ⭐ 引入購物車 context
import BackToTop from "../components/BackToTop.jsx";

function Cart() {
  const { state, dispatch } = useCartContext(); // ⭐ 使用 context
  const { cartItems } = state;

  return (
    <div className="bg-neutral text-accent min-h-screen flex flex-col">
      <Header />

      {/* 購物車清單區域 */}
      <main className="flex-1 px-4 md:px-20 py-8">
        <h2 className="text-2xl font-bold mb-6">CART</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg">CART IS EMPTY</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-neutral p-4 mb-4 border border-accent rounded-lg"
            >
              {/* 商品圖片 */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl mr-4"
              />

              {/* 商品資訊 */}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-accent">NT${item.price}</p>
              </div>

              {/* 移除按鈕 */}
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: index })
                }
                className="text-primary text-sm hover:underline"
              >
                REMOVE
              </button>
            </div>
          ))
        )}
      </main>
      <BackToTop />

      {/* Email 區塊 */}
      <Email />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Cart;
