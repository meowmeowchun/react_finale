import { Link } from "react-router-dom";
import Magnet from "../components/Magnet"; // ⬅️ 加這行

function Cover() {
  return (
    <div className="h-[100vh] bg-neutral flex items-center justify-center relative">
      <Link to="/" className="flex gap-4 w-full justify-center items-center">
        {/* 左邊面具 */}
        <img
  src="./img/left head.png"
  className="h-[50vh] absolute left-0 top-30 animate-mask-left z-10"
  style={{ animationDelay: "0.2s" }}
  alt="Left Head"
/>

<Magnet padding={80} magnetStrength={100}>
  <img
    src="./img/main head.png"
    className="h-[80vh] breathe-animation"
    style={{
      opacity: 0,
      animation: "fadeInOpacity 2.3s ease-out 0.4s forwards",
    }}
    alt="Main Head"
  />
</Magnet>



<img
  src="./img/right head.png"
  className="h-[50vh] absolute right-0 top-30 animate-mask-right"
  style={{ animationDelay: "0.2s" }}
  alt="Right Head"
/>

      </Link>
    </div>
  );
}

export default Cover;
