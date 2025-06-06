import { Link, useLocation } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { useCartContext } from "../redux/CartContext";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const { state } = useCartContext();
  const cartCount = state.cartItems.length;

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark" 
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const links = [
    { to: "/fullart", label: "FULLART" },
    { to: "/fanart", label: "FANART" },
    { to: "/yamato", label: "YAMATO" },
    { to: "/sketch", label: "SKETCH" },
  ];

  const [showHeader, setShowHeader] = useState(true);
let lastScrollY = window.scrollY;

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // 滾動向下且已往下滑一段距離，隱藏 header
      setShowHeader(false);
    } else {
      // 滾動向上，顯示 header
      setShowHeader(true);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <header className={`sticky top-0 z-50 bg-neutral text-accent transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="flex justify-center py-4">
        <Link to="/">
          <img src="/img/icon choas 3.png" className="h-20" alt="Logo" />
        </Link>
      </div>
      {/* Theme controller */}
    <div className="absolute right-6 top-1/5 sm:right-20 sm:top-1/2 -translate-y-1/2 text-primary text-3xl hover:text-secondary">
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input 
        type="checkbox" 
        className="theme-controller" 
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            checked={theme === "dark"} />

        {/* sun icon */}
        <svg
          className="h-8 w-8 swap-off sm:h-10 sm:w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-on h-8 w-8 sm:h-10 sm:w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
      </div>

      {/* Cart icon */}
        <Link
          to="/cart"
          className="absolute h-8 w-8 sm:h-10 sm:w-10 right-6 top-1/2 -translate-y-1/2 text-primary text-3xl hover:text-secondary"
        >
          <MdShoppingCart className="w-full h-full" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-neutral font-[Girassol] text-xs w-3 h-3 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      

      <nav className="shadow-md">
        <ul className="flex justify-center gap-3 sm:gap-8 py-4 ml-3 mr-3 sm:mr-5">
          {links.map((link) => (
            <li key={link.to} className="text-center">
              <Link
                to={link.to}
                className={`text-primary font-[Girassol] text-2xl transition-all duration-300
                ${location.pathname === link.to ? "text-accent" : "hover:text-secondary"}
              `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
