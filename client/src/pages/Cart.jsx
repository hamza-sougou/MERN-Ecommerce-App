import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Fonction pour formater les prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Votre panier est vide!{"  "}
            <Link to="/shop" className="text-pink-500">
              Besoin d'inspi ?
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semi-bold mb-4">
                Mon panier ({cartItems.length})
              </h1>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      {formatPrice(item.price)} F CFA
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Articles (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    articles)
                  </h2>
                  <div className="text-2xl font-semibold">
                    {formatPrice(
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )}{" "}
                    F CFA
                  </div>
                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Commander
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
