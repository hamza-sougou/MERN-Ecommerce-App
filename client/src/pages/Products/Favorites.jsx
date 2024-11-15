import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="px-[1rem] md:px-[10rem] ">
      <h1 className="text-lg font-bold mt-[3rem]">VOS FAVORIS</h1>
      <div className="flex flex-col md:flex-row ">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
