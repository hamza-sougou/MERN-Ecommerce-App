import { Link } from "react-router-dom";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DropdownProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col dropdownProfile">
      {!userInfo ? (
        <div>
          <Link to="/login">
            <button className="w-full py-2 bg-black text-white mb-3">
              Connexion
            </button>
          </Link>

          <Link to="/register">
            <button className="w-full py-2 bg-orange-500 text-white">
              Inscription
            </button>
          </Link>

          <hr className="mt-3 mb-1" />
        </div>
      ) : (
        <>
          {!userInfo.isAdmin && (
            <ul className="flex flex-col ">
              <Link to="/profile">
                <li className="hover:bg-orange-200 py-2 pl-3">Profil</li>
              </Link>
              <Link to="/user-orders">
                <li className="hover:bg-orange-200 py-2 pl-3">Mes commandes</li>
              </Link>
              <Link to="/" aria-disabled>
                <li className="hover:bg-orange-200 py-2 pl-3">
                  Aide & Contact
                </li>
              </Link>
            </ul>
          )}

          {userInfo.isAdmin && (
            <ul className="flex flex-col ">
              <Link to="/admin/dashboard">
                <li className="hover:bg-orange-200 py-2 pl-3">
                  Tableau de bord
                </li>
              </Link>
              <Link to="/admin/productlist">
                <li className="hover:bg-orange-200 py-2 pl-3">Produits</li>
              </Link>
              <Link to="/admin/categorylist">
                <li className="hover:bg-orange-200 py-2 pl-3">Catégories</li>
              </Link>
              <Link to="/admin/orderlist">
                <li className="hover:bg-orange-200 py-2 pl-3">Commandes</li>
              </Link>
              <Link to="/admin/userlist">
                <li className="hover:bg-orange-200 py-2 pl-3">Utilisateurs</li>
              </Link>
            </ul>
          )}

          <div>
            <hr className="pb-1" />
            <button onClick={logoutHandler} className="text-orange-600 pl-3">
              Déconnexion
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownProfile;
