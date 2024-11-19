import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";

import "moment/locale/fr-ch";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

moment.locale("fr-ch");

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Produit évalué avec succès");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="w-full px-[1rem] md:px-[10rem]">
      <div>
        <Link to="/" className=" font-semibold hover:underline">
          Retour
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="w-full relative">
          <div className="mt-[2rem] ">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="">
                <img
                  src={product.image}
                  alt={product.name}
                  className="flex-1 w-full md:w-[30rem] md:h-[40rem] object-cover mr-[2rem]"
                />

                <HeartIcon product={product} />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="my-4 w-full text-[#B0B0B0]">
                  {product.description}
                </p>

                <p className="text-5xl my-4 font-extrabold">
                  {formatPrice(product.price)} F CFA
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:w-[20rem]">
                  <div className="flex-1 flex flex-col">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2" /> Marque: {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[20rem]">
                      <FaClock className="mr-2 " /> Ajouté:{" "}
                      {moment(product.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 " /> Avis: {product.numReviews}
                    </h1>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h1 className="flex  md:items-center mb-6">
                      <FaStar className="mr-2 " /> Note: {rating}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 " /> Quantité:{" "}
                      {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[10rem]">
                      <FaBox className="mr-2 " /> En Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap md:w-full">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} Avis`}
                  />

                  {product.countInStock > 0 && (
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="p-2 w-[6rem] rounded "
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="btn-container">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-orange-500 text-white py-2 px-4 rounded mt-4 md:mt-0"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-[5rem] flex flex-wrap w-full items-start justify-between ">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
