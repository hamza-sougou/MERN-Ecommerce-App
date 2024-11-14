import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-[30rem] h-[40rem] rounded"
          />
        </Link>
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              {formatPrice(product.price)} F CFA
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
