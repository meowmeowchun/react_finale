import { useParams } from "react-router-dom";
import fanart from "../data/fanart";
import fullart from "../data/fullart";
import sketch from "../data/sketch";
import yamato from "../data/yamato";

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

  if (!product) return <div className="text-center mt-10">找不到這個商品。</div>;

  return (
    <div className="min-h-screen bg-neutral text-accent p-6">
      <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl">
        <figure className="p-6">
          <img src={product.image} alt={product.title} className="rounded-xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary">{product.title}</h2>
          <p className="text-base-content">{product.description || "這是作品介紹。"}</p>
          <div className="card-actions justify-end">
            <span className="text-lg font-bold">${product.price}</span>
            <button className="btn btn-primary">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
