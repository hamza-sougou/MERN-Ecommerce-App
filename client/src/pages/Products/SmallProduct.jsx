import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  const formattedPrice = product.price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "XOF",
  });

  return (
    <div className="w-full px-3">
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <div className="relative pb-[0.7rem]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[22rem] rounded object-cover"
            />
            <HeartIcon product={product} />
          </div>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-orange-300 text-orange-700 text-xs font-medium mr-2 px-2.5  rounded">
              {formattedPrice}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
