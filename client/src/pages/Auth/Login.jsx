import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import pcu_logo from "../../assets/pcu_logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setVisiblePassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="flex bg-white h-screen w-full -my-[1rem] items-center justify-center">
      <div className="flex flex-col w-full lg:w-1/3 bg-orange-50 p-[3rem] justify-between gap-6">
        <div className="flex w-full h-[5rem] justify-center">
          <img src={pcu_logo} alt="logo" />
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-3xl font-semibold mb-2">Se connecter</h2>
          <h3 className="mb-2">
            <i>C&apos;est vite fait !</i>
          </h3>
        </div>

        <form action="" onSubmit={submitHandler}>
          <div className="w-full flex flex-col">
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
            </div>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white p-4 text-center flex items-center justify-center"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
            {isLoading && <Loader />}
          </div>
        </form>

        <div className="w-full flex items-center justify-center">
          <p>
            Pas encore de compte?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:underline underline-offset-2 cursor-pointer"
            >
              Inscrivez-vous!
            </Link>
          </p>
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
            Mot de passe oublié?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
