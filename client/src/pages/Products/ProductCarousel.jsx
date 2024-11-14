import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import "moment/locale/fr";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  return (
    <div className="mb-4 flex w-full">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block p-5"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full object-cover h-[30rem]"
                />

                <div className="flex justify-between w-[20rem]">
                  <div className="one ">
                    <h2>{name}</h2>
                    <div className="flex items-center justify-center bg-orange-300 text-orange-700 rounded py-1 mt-2 px-2 w-[10rem]">
                      <p className="font-semibold">
                        {formatPrice(price)} F CFA
                      </p>
                    </div>

                    <br />
                    <p className="w-[25rem]">
                      {description.substring(0, 120)}...
                    </p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStore className="mr-2" /> Marque: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="mr-2" /> Date:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStar className="mr-2" /> Avis: {numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <h1 className="flex items-center mb-6 w-[5rem]">
                        <FaStar className="mr-2" /> Note: {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaShoppingCart className="mr-2" /> Quantité: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaBox className="mr-2" /> En Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
