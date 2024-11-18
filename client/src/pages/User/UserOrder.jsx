import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Mes commandes</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">IMAGE</th>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">DATE</th>
                <th className="py-2 px-4 text-left">TOTAL</th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  PAYÉ
                </th>
                <th className="py-2 px-4 text-left hidden sm:table-cell">
                  LIVRÉ
                </th>
                <th className="py-2 px-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.user}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-2 px-4">{order.totalPrice} F CFA</td>
                  <td className="py-2 px-4 hidden sm:table-cell">
                    {order.isPaid ? (
                      <span className="inline-block py-1 px-3 bg-green-500 text-white rounded-full text-sm">
                        Complétée
                      </span>
                    ) : (
                      <span className="inline-block py-1 px-3 bg-red-500 text-white rounded-full text-sm">
                        En Attente
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 hidden sm:table-cell">
                    {order.isDelivered ? (
                      <span className="inline-block py-1 px-3 bg-green-500 text-white rounded-full text-sm">
                        Complétée
                      </span>
                    ) : (
                      <span className="inline-block py-1 px-3 bg-red-500 text-white rounded-full text-sm">
                        En Attente
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded ">
                        Plus de détails
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
