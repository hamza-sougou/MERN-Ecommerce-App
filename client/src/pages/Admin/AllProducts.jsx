import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { FaArrowRight } from "react-icons/fa6";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { useState } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Erreur de Chargement des Produits</div>;
  }

  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="w-full px-[1rem] xl:px-[10rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            Tous les produits ({sortedProducts.length})
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentProducts.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block mb-4 overflow-hidden  border-gray-200 rounded"
              >
                <div className="flex w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] object-cover"
                  />
                  <div className="p-4 flex flex-col justify-around w-full">
                    <div className="flex justify-between">
                      <h5 className="text-xl font-semibold mb-2">
                        {product?.name}
                      </h5>
                      <p className="text-gray-400 text-sm">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {product?.description?.substring(0, 60)}...
                    </p>
                    <div className="flex justify-between">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600 transition-all group"
                      >
                        Mettre à jour{" "}
                        <FaArrowRight className="text-md ml-2 group-hover:ml-4 transition-all" />
                      </Link>
                      <p>XOF {product.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <AdminMenu />
      </div>
    </div>
  );
};

export default AllProducts;
