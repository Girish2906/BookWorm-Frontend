import { useState , useEffect } from "react";
const Header = () => {

    const [toolTip, setToolTip] = useState(false) ; 
    useEffect(() => {
        console.log("tooltip", toolTip) ; 
    } , [toolTip]) ; 

    return (
        <div className="navbar bg-base-100  flex justify-between  m-3 ml-5 rounded-2xl bg-[#4f6d7a] text-white">
            <a className="btn btn-ghost text-xl m-4">BookWorm
                 {/* <img className="w-5 h-5" src="https://st.depositphotos.com/1007712/3326/v/450/depositphotos_33265841-stock-illustration-book-icon.jpg" alt="" />  */}
                 </a>
            <div className="relative m-4 cursor-pointer group pr-3">
            <div>Hello, sign-in</div>
            <button className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
  <div className="bg-yellow-400 w-32 mr-4 text-center">Sign-in</div>
</button>
            {/* <button className="absolute left-0 top-full mt-2 btn btn-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-yellow-400 w-32 mr-4">Sign-in</div>
            </button> */}
            </div>
        </div>
    )
} ; 

export default Header ; 