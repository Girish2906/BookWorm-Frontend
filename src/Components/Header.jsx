import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./Login";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
// import {persistor} from "@reduxjs/toolkit" ; 

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(true);

  const fetchUser = async () => {
    try {
      console.log("fetchUser");
      const response = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setSignIn(false);
      }
    } catch (Error) {
      console.log("Header.jsx: ", Error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout" , {} , {withCredentials: true} ) ; 
      // await axios.post(BASE_URL + "/logout" , {withCredential s: true} ) ; 
      // const response = await axios.post(BASE_URL + "/logout", {
      //   withCredentials: true,
      // });
      // console.log("this is the logot response" , response) ; 
      navigate("/login");

      // if (response.status === 200) {
      //   console.log("removing teh user")
      //   dispatch(removeUser());
      //   return navigate("/login");
      // }
    } catch (Error) {
      console.error("Header.jsx handleLogout", Error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="navbar bg-base-100 m-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">BookWorm</a>
      </div>
      <div className="flex-none gap-2 mr-5">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              {/* <a>Logout</a> */}
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
          <div className="fixed top-4 right-4 z-50 transition-opacity duration-300 opacity-100">

        </div>

    </div>
  );
};

export default Header;
