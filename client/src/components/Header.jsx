import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex w-full">
        <div className="flex-1 w-full flex flex-wrap ">
          {data?.map((product) => (
            <div key={product._id} className="w-full md:w-1/2 p-2">
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
        <div className="hidden xl:flex-1 xl:flex">
          <ProductCarousel />
        </div>
      </div>
    </>
  );
};

export default Header;
