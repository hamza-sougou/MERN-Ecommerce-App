import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import pcu_logo from "../../assets/pcu_logo.svg";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisiblePassword, setVisiblePassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne sont pas identiques");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success(`Bienvenue ${res.username} !`);
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="flex bg-white h-screen w-full pt-[10rem] items-center justify-center">
      <div className="flex flex-col w-full lg:w-1/3 bg-orange-50 p-[3rem] justify-between gap-6">
        <div className="flex w-full h-[5rem] justify-center">
          <img src={pcu_logo} alt="logo" />
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-3xl font-semibold mb-2">S&apos;inscrire</h2>
          <h3 className="mb-2">
            <i>Bienvenue chez PC Universe</i>
          </h3>
        </div>

        <form action="" onSubmit={submitHandler}>
          <div className="w-full flex flex-col">
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
              placeholder="Nom"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
              placeholder="Adresse Email"
            />
            <div className="relative">
              <input
                type={isVisiblePassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
                placeholder="Mot de passe"
              />
              <div
                onClick={() => setVisiblePassword(!isVisiblePassword)}
                className="absolute text-2xl top-[1.6rem] right-4"
              >
                {isVisiblePassword ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
              <input
                type="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
                placeholder="Confirmer le mot de passe"
              />
              <PasswordStrengthMeter password={password} />
            </div>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white p-4 text-center flex items-center justify-center"
            >
              {isLoading ? "Inscription..." : "S'inscrire"}
            </button>
            {isLoading && <Loader />}
          </div>
        </form>

        <div className="w-full flex items-center justify-center">
          <p>
            Déja inscrit?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:underline underline-offset-2 cursor-pointer"
            >
              Connectez-vous!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
