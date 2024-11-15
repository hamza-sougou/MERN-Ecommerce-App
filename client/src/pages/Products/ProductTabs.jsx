import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row w-full mr-[1rem] md:mr-0">
      <section className="flex md:block flex-row  items-center md:mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-md ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Avis
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-md ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          Tous les avis
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-md ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Similaires
        </div>
      </section>

      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Notes
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded w-full"
                  >
                    <option selected>Selectionner</option>
                    <option value="1">Très Mauvais</option>
                    <option value="2">Mauvais</option>
                    <option value="3">Décent</option>
                    <option value="4">Bon</option>
                    <option value="5">Excellent</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Commentaire
                  </label>

                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded w-full"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-orange-500 text-white py-2 px-4 rounded"
                >
                  Soumettre
                </button>
              </form>
            ) : (
              <p>
                Please{" "}
                <Link to="/login" className="text-orange-600">
                  se connecter
                </Link>{" "}
                pour laisser un avis
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <>
            <div>
              {product.reviews.length === 0 && <p>Aucun avis pour le moment</p>}
            </div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#efecec] p-4 rounded xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#787878]">{review.name}</strong>
                    <p className="text-[#787878]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <section className="flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
