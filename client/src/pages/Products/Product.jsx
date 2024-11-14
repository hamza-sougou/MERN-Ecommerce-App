import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};

const Product = ({ product }) => {
  return (
    <div className="flex flex-col items-center p-5 rounded">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-96 object-cover rounded-lg"
          />
        </Link>
        <HeartIcon product={product} className="absolute top-2 right-2" />
      </div>
      <div className="mt-4 w-full">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <span className="bg-orange-300 text-orange-700 text-sm font-medium px-2.5 py-0.5 rounded">
              {formatPrice(product.price)} F CFA
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
