import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./Login";
import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { ExploreLoginContext } from "./Books";
// import { Sparkles } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { useExploreLogin } from "./Context";

const Header = () => {
  const { isLogin, setIsLogin, showLoginAnimation, setShowLoginAnimation } = useExploreLogin() ; 
  console.log("isLogin and showLoginAnimation",isLogin, showLoginAnimation);

  // console.log(obj , " in header.jsx " , isLogin , showLoginAnimation ) ;
  // console.log("!#$#",isLogin, showLoginAnimation) ;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutBox , setShowLogoutBox] = useState(false) ; 
  const [loading , setLoading] = useState(false) ; 
  const [signIn, setSignIn] = useState(true);
  const [showUploadIcon , setShowUploadIcon] = useState(true) ; 
  const [showNotificationIcon , setShowNotificationIcon ] = useState(true) ; 

  const checkURL = () => {
      const hostUrl = window.location.href.split('/') ; 
      console.log(30 , "this is the hostURL" , hostUrl) ; 
    if(hostUrl[hostUrl.length-1] === 'upload'){
      setShowUploadIcon(!showUploadIcon) ; 
    } if(hostUrl[hostUrl.length-1] === 'interests'){
      setShowNotificationIcon(!showNotificationIcon) ; 
    }
  }

  useEffect(() => {
    checkURL() ; 
  } , [])

  const fetchUser = async () => {
    try {
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
    setLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
  
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
  
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Header.jsx handleLogout", error.message);
    } finally {
      setLoading(false); // Ensure loading state is reset even if error occurs
    }
  };
  
  const handleUpload = () => {
    navigate("/upload") ; 
  }

  const loadNotificationn = () => {
    navigate("/interests" ) ; 
  }

  useEffect(() => {
    fetchUser();
  });

  return (
    <div className="navbar bg-white m-4">
      <div className="flex-1" >
        <a  onClick={() => {navigate("/")}} className=" cursor-pointer text-xl font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-300">
          BookWorm
        </a>
      </div>
      <div>
        <div className="mr-8 relative flex">
      {
        isLogin && showNotificationIcon &&  (
          <div className="mr-6">
             <button class="relative bg-blue-700 hover:bg-blue-800 duration-300 py-2 px-4 text-blue-100 rounded cursor-pointer" onClick={loadNotificationn} >Notifications
          </button>
          </div>
        )
      }
          {showUploadIcon &&   <PlusCircle   className={`w-6 h-6 text-blue-500 mt-2 mr-4 cursor-pointer ${!isLogin ? "hidden" : ""}`}  title="Upload a book" onClick={handleUpload} />}
          <button
            className={`btn cursor-pointer transition-all duration-300 ${
              showLoginAnimation
                ? "bg-red-400  animate-pulse text-white"
                : "btn-accent hover:scale-105"
            }`} onClick={() => {
              if(!isLogin){
                setIsLogin(false) ;
                navigate("/login") ; 
              } else{
                setShowLogoutBox(true) ; 
              }
            }}
          >
            {isLogin ? "Logout" : "Login"}
          </button>
        </div>

        {/* <button className="btn btn-accent cursor-pointer" onClick={ () => {console.log("Login Button")} } >Login</button> */}
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed top-4 right-4 z-50 transition-opacity duration-300 opacity-100"></div>
      {
        showLogoutBox && <div>
          <div  className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-600 w-96 h-40 p-4 rounded-lg flex flex-col justify-center items-center">
              <h1 className="text-2xl">Are you sure you want to logout?</h1>
              <div className="flex gap-4 mt-4">
                <button className="btn btn-danger" disabled={loading} onClick={handleLogout}>  Yes</button>
                <button className="btn btn-success" onClick={() => setShowLogoutBox(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      } {loading && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 z-50">
          <div className="animate-spin border-t-4 border-white border-solid rounded-full h-16 w-16"></div>
        </div>
      )}
    </div>
  );
};

export default Header;
