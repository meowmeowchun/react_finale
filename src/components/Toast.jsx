// components/Toast.jsx
import { useEffect } from "react";
import { useCartContext } from "../redux/CartContext";

function Toast({ message }) {
  const { dispatch } = useCartContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-accent text-neutral px-4 py-2 rounded shadow-lg z-[1000]">
      {message}
    </div>
  );
}

export default Toast;
