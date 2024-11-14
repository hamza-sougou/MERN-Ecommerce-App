import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisiblePassword, setVisiblePassword] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">
            Mettre à jour le profil
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter name"
                className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={isVisiblePassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setVisiblePassword(!isVisiblePassword)}
                className="absolute text-2xl top-[1.6rem] right-4"
              >
                {isVisiblePassword ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Saisir à nouveau"
                className="w-full py-4 my-2 bg-transparent text-black border-b focus:border-b-2
             border-orange-500 focus:border-orange-500 border-t-0 border-l-0 border-r-0
              outline-none focus:outline-none  focus:ring-0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 px-5 hover:bg-orange-600 cursor-pointer"
              >
                Mettre à jour
              </button>

              <Link
                to="/user-orders"
                className="bg-black text-white py-3 px-5  hover:bg-black cursor-pointer"
              >
                Mes commandes
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
