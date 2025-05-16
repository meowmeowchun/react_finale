import { Link } from "react-router-dom";

function Cover() {
  return (
    <div className="h-[100vh] bg-neutral flex items-center justify-center relative"> 
      <Link to="/" className="flex gap-4 w-full justify-center items-center">
        <img src="./img/left head.png" className="h-[50vh] absolute left-0 top-30" alt="Left Head" />
        <img src="./img/main head.png" className="h-[80vh]" alt="Main Head" />
        <img src="./img/right head.png" className="h-[50vh] absolute right-0 top-30" alt="Right Head" />
      </Link>
    </div>
  );
}

export default Cover;