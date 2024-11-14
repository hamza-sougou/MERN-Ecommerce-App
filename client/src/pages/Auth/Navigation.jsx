import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { Link } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import "./Navigation.css";
import { useSelector } from "react-redux";
import FavoritesCount from "../Products/FavoritesCount";
import jayma_logo from "../../assets/jayma_logo.svg";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import clsx from "clsx";
import { useRef } from "react";
import DropdownProfile from "./DropdownProfile.jsx";
import { useGetProductsQuery } from "../../redux/api/productApiSlice.js";

const Navigation = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { data: categories = [] } = useFetchCategoriesQuery();

  // const { userInfo } = useSelector((state) => state.auth);

  const [isSideMenuOpen, setMenu] = useState(false);
  const [isHoveringProfile, setHoveringProfile] = useState(false);

  const dropdownRef = useRef(null);

  const handleMouseEnter = () => setHoveringProfile(true);
  const handleMouseLeave = () => setHoveringProfile(false);

  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchResults = [], isFetching } = useGetProductsQuery(
    { keyword: searchTerm },
    {
      skip: !searchTerm,
    }
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="lg:px-[10rem] px-4 bg-white">
      <nav
        className="flex justify-between items-center py-6 pr-[5rem] lg:pr-0"
        id="navigation-container"
      >
        <section className="flex items-center gap-4">
          <RiMenu2Fill
            onClick={() => setMenu(true)}
            className="text-3xl cursor-pointer lg:hidden"
          />
          <Link to="/" className="text-4xl">
            <img src={jayma_logo} className="w-[3rem]" alt="logo" />
          </Link>

          {/* {userInfo && !userInfo.isAdmin && (
            <div className="flex gap-3">
              <div className="h-5 w-5 bg-red-600 rounded-full"></div>
              <span>UTILISATEUR</span>
            </div>
          )}

          {userInfo && userInfo.isAdmin ? (
            <div className="flex gap-3">
              <div className="h-5 w-5 bg-green-600 rounded-full"></div>
              <span>ADMINISTRATEUR</span>
            </div>
          ) : (
            <></>
          )} */}
        </section>

        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 translate-x-full transition-all",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white w-[50%] flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />
            {categories?.map((c) => (
              <Link key={c._id}>{c.name}</Link>
            ))}
          </section>
        </div>

        <section className="flex items-center mr-0 gap-6  ">
          {/* DropdownProfile */}
          <div
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHoveringProfile && <DropdownProfile />}
          </div>

          <FiUser
            className="text-3xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          <Link to="/favorite" className="flex relative">
            <div>
              <GrFavorite className="text-3xl" />
              <FavoritesCount />
            </div>
          </Link>

          <Link to="/cart" className="flex relative">
            <div>
              <AiOutlineShoppingCart className="text-3xl" />
              <span className="hidden nav-item-name mt-[3rem]">Panier</span>
            </div>

            <div className="absolute left-6 -top-2">
              {cartItems.length > 0 && (
                <span>
                  <span className="px-[0.35rem] py-[0.02rem] text-sm text-white bg-orange-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                </span>
              )}
            </div>
          </Link>
        </section>
      </nav>
      <hr className="-mx-[10rem]" />
      <div className="flex items-center justify-between gap-4">
        <section className="hidden lg:flex w-auto justify-center items-center gap-0">
          {categories.map((c) => (
            <Link key={c._id} className="hidden lg:block">
              <div className="py-2 px-4 hover:bg-black/10 active:bg-black/10 hover:text-orange-500 transition">
                {c.name}
              </div>
            </Link>
          ))}
        </section>
        <input
          type="text"
          id="searchBar"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Rechercher des produits..."
          className="border p-2 "
        />
        {searchTerm && !isFetching && searchResults.length > 0 && (
          <div className="absolute bg-white border w-full mt-1">
            {searchResults.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <hr className="-mx-[10rem]" />
    </main>
  );
};

export default Navigation;
