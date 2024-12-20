import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="w-full px-[1rem] md:px-[10rem] mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Votre panier est vide</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Produit</td>
                  <td className="px-1 py-2 text-left">Quantité</td>
                  <td className="px-1 py-2 text-left">Prix</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(0)}</td>
                    <td className="p-2">
                      F CFA {(item.qty * item.price).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Sommaire de commande</h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#efecec]">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Articles:</span>{" "}
                {cart.itemsPrice} F CFA
              </li>
              <li>
                <span className="font-semibold mb-4">Livraison:</span>{" "}
                {cart.shippingPrice} F CFA
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span>{" "}
                {cart.totalPrice} F CFA
              </li>

              {error && (
                <Message variant="danger">{error.data.message}</Message>
              )}
            </ul>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Livraison</h2>
              <p>
                <strong>Adresse:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb4">
                Méthode de paiement
              </h2>
              <strong>Méthode: </strong>
              {cart.paymentMethod}
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="bg-orange-500 text-white py-2 px-4 rounded text-lg w-full md:w-[50%] mt-4"
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Passer la commande
            </button>
          </div>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
