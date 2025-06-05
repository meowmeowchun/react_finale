import React, { useState } from "react";
import Magnet from "../components/Magnet"; // ← 確保有引入

const SubscribeBanner = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail(""); // 清空輸入欄
      setTimeout(() => {
        setSubscribed(false); // 幾秒後自動關閉提示訊息（可選）
      }, 3000);
    }
  };

  return (
    
      <div className="bg-neutral text-center py-12 px-4">
      {/* 怪物插圖 + Magnet 動畫 */}
      <Magnet padding={100} magnetStrength={5}>
        <img
          src="/img/deman.png"
          alt="Monster Illustration"
          className="mx-auto max-w-4xl w-full mb-8"
        />
      </Magnet>
      
      

      {/* 標語文字 */}
      <p className="text-primary font-[Girassol] font-bold text-lg uppercase tracking-wider mb-4">
        Subscribe to be notified for more of my works
      </p>

      {/* 表單區塊 */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-md bg-accent font-[Girassol] tracking-wide text-neutral placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <button
          onClick={handleSubscribe}
          className="bg-primary text-white font-[Girassol] tracking-wider font-bold px-5 py-2 rounded-md hover:bg-primary transition"
        >
          Subscribe
        </button>
      </div>

      {/* 感謝訊息 */}
      {subscribed && (
        <div className="mt-6 text-primary font-semibold text-lg font-[Girassol] tracking-wider">
          Thanks for the subscription!
        </div>
      )}
    </div>
  );
};

export default SubscribeBanner;
