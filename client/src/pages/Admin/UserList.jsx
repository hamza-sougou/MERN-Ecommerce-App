import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) {
      try {
        await deleteUser(id);
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left hidden sm:table-cell">ID</th>
                  <th className="p-2 text-left">NOM</th>
                  <th className="p-2 text-left">EMAIL</th>
                  <th className="p-2 text-left">ADMIN</th>
                  <th className="p-2 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-2 hidden sm:table-cell">{user._id}</td>
                    <td className="p-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full p-2 border rounded"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-2 ">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full p-2 border rounded"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div>{user.email}</div>
                      )}
                    </td>
                    <td className="p-2 hidden sm:table-cell">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="p-2">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
