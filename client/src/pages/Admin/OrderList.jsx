import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <AdminMenu />
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">ARTICLES</th>
                <th className="p-2 text-left hidden md:table-cell">ID</th>
                <th className="p-2 text-left">UTILISATEUR</th>
                <th className="p-2 text-left hidden sm:table-cell">DATE</th>
                <th className="p-2 text-left hidden sm:table-cell">TOTAL</th>
                <th className="p-2 text-left">PAYÉ</th>
                <th className="p-2 text-left hidden sm:table-cell">LIVRÉ</th>
                <th className="p-2 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-2 hidden md:table-cell">{order._id}</td>
                  <td className="p-2">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="p-2 hidden sm:table-cell">
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td className="p-2 hidden sm:table-cell">
                    {order.totalPrice} F CFA
                  </td>
                  <td className="p-2">
                    {order.isPaid ? (
                      <span className="block text-center bg-green-500 text-white rounded px-2 py-1">
                        Complétée
                      </span>
                    ) : (
                      <span className="block text-center bg-orange-500 text-white rounded px-2 py-1">
                        En Attente
                      </span>
                    )}
                  </td>
                  <td className="p-2 hidden sm:table-cell">
                    {order.isDelivered ? (
                      <span className="block text-center bg-green-500 text-white rounded px-2 py-1">
                        Complétée
                      </span>
                    ) : (
                      <span className="block text-center bg-orange-500 text-white rounded px-2 py-1">
                        En Attente
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="text-orange-500 hover:underline">
                        Voir plus
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;
