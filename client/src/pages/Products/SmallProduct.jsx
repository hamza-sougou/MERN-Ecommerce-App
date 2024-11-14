import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  // Formatez le prix avec des points tous les trois chiffres
  const formattedPrice = product.price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "XOF",
  });

  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[20rem] h-[22rem] rounded"
        />
        <HeartIcon product={product} className="" />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              {formattedPrice} {/* Utilisez le prix formaté ici */}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
