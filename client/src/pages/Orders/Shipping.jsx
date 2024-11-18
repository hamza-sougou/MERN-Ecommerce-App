import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="w-full px-[1rem] md:px-[10rem] mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Expédition</h1>
          <div className="mb-4">
            <label htmlFor="" className="block mb-2">
              Adresse
            </label>
            <input
              type="text"
              className="w-full p-2 border border-orange-400 rounded focus:border-none focus:ring focus:ring-orange-500 transition-all"
              placeholder="Entrez votre adresse"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block  mb-2">
              Ville
            </label>
            <input
              type="text"
              className="w-full p-2 border border-orange-400 rounded focus:border-none focus:ring focus:ring-orange-500 transition-all"
              placeholder="Entrez votre ville"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block  mb-2">
              Code postal
            </label>
            <input
              type="text"
              className="w-full p-2 border border-orange-400 rounded focus:border-none focus:ring focus:ring-orange-500 transition-all"
              placeholder="Entrez votre code postal"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block  mb-2">
              Pays
            </label>
            <input
              type="text"
              className="w-full p-2 border border-orange-400 rounded focus:border-none focus:ring focus:ring-orange-500 transition-all"
              placeholder="Entrez votre pays"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">
              Sélectionnez une méthode de paiement
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-orange-500"
                  name="paymentMethod"
                  value="Paypal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2">PayPal ou Carte de crédit</span>
              </label>
            </div>
          </div>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded text-lg w-full hover:bg-orange-600 transition-all"
            type="submit"
          >
            Continuer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
