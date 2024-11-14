import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { MdAdminPanelSettings } from "react-icons/md";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen
            ? "top-5 right-7 z-30 md:right-7 sm:right-5 xs:right-5"
            : "top-5 right-7"
        } bg--[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="black" />
        ) : (
          <>
            <MdAdminPanelSettings className="text-3xl hover:text-orange-500 transition" />
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#FFF] border border-gray-900 p-4 fixed right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-orange-200 rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "orange" : "black",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-orange-200 rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "orange" : "black",
                })}
              >
                Créer Catégorie
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-orange-200 rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "orange" : "black",
                })}
              >
                Créer Produit
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-orange-200 rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "orange" : "black",
                })}
              >
                Tous les Produits
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-orange-200 rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "orange" : "black",
                })}
              >
                Gérer Utilisateurs
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-orange-200 rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "orange" : "black",
                })}
              >
                Gérer Commandes
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
