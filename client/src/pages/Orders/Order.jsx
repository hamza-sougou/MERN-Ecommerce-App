import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadingPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });

        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaypalScript();
        }
      }
    }
  }, [errorPaypal, loadingPaypal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Votre commande a bien été payée");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col w-full px-[1rem] md:px-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Votre commande est vide</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2">
                  <tr className="text-sm md:text-lg">
                    <th className="p-2">Image</th>
                    <th className="p-2">Produit</th>
                    <th className="p-2 text-center">Quantité</th>
                    <th className="p-2">Prix Unitaire</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2 text-sm md:text-lg">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center text-sm md:text-lg">
                        {item.qty}
                      </td>
                      <td className="p-2 text-center text-sm md:text-lg">
                        {item.price}
                      </td>
                      <td className="p-2 text-center text-sm md:text-lg">
                        {item.qty * item.price} F
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Expédition</h2>
          <p className="mb-4 mt-4">
            <strong className="text-orange-500">Commande: </strong>
            {order._id}
          </p>
          <p className="mb-4">
            <strong className="text-orange-500">Nom: </strong>
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-orange-500">Email: </strong>
            {order.user.email}
          </p>
          <p className="mb-4">
            <strong className="text-orange-500">Adresse: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p className="mb-4">
            <strong className="text-orange-500">Méthode de paiement: </strong>
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Payé le {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Pas encore payé</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">
          Résumé de la commande
        </h2>
        <div className="flex justify-between mb-2">
          <span>Articles</span>
          <span>{order.itemsPrice} F CFA</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Expédition</span>
          <span>{order.shippingPrice} F CFA</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>
            Taxe{" "}
            <strong>
              <i className="text-sm">(18%)</i>
            </strong>
          </span>
          <span>{order.taxPrice} F CFA</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>{order.totalPrice} F CFA</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-orange-500 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Marquer comme livrée
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
