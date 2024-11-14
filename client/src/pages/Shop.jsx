import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            const price = product.price;
            const min = minPrice ? parseFloat(minPrice) : 0;
            const max = maxPrice ? parseFloat(maxPrice) : Infinity;
            return price >= min && price <= max;
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    minPrice,
    maxPrice,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    dispatch(setChecked([])); // Optionnel: réinitialiser les marques cochées
    // Vous pouvez également réinitialiser les produits selon la logique que vous avez
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row ">
          <div className="bg-[#151515] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filtrer par catégorie
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={c._id}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-grey-100 border-gray-300   
                      rounded focus:ring-pink-500 dark:focus:ring-pink-600  
                       dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700   
                       dark:border-gray-600"
                    />
                    <label
                      htmlFor={c._id}
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filtrer par marque
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <div className="flex items-center mr-4 mb-5" key={brand}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300   
                    focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800  
                     focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filtrer par prix
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="number"
                placeholder="Prix minimum"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border  
                 rounded-lg focus:outline-none focus:ring focus:ring-pink-600 mb-2"
              />
              <input
                type="number"
                placeholder="Prix maximum"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border  
                 rounded-lg focus:outline-none focus:ring focus:ring-pink-600"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full border my-4 py-2 hover:bg-white hover:text-black"
                onClick={handleResetFilters}
              >
                Réinitialiser
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 text-center mb-2">
              {products?.length} produits trouvés
            </h2>
            <div className="flex flex-wrap">
              {products?.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
