import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Fullart from "./pages/Fullart";
import Fanart from "./pages/Fanart";
import Yamato from "./pages/Yamato";
import Sketch from "./pages/Sketch";

import { CartProvider, useCartContext } from "./redux/CartContext";
import Toast from "./components/Toast";
import "./App.css";
import Product from "./pages/Product"; // ← 新增這行

function AppContent() {
  const { state } = useCartContext();
  const { notification } = state;

  return (
    <>
      {notification && <Toast message={notification} />}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/fullart" element={<Fullart />} />
          <Route path="/fanart" element={<Fanart />} />
          <Route path="/yamato" element={<Yamato />} />
          <Route path="/sketch" element={<Sketch />} />
          <Route path="/product/:type/:id" element={<Product />} /> {/* ⬅ 加上這行 */}
        </Routes>
      </Router>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
