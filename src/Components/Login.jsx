import { useState , useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Login = () => {

    const [newUser , setNewUser] = useState(false) ; 
    const [loginString , setLoginString] = useState("Existing User? Sign in here") ; 
    const [firstName , setFirstName] = useState("") ; 
    const [lastName , setLastName] = useState("") ;
    const [email , setEmail] = useState("") ;
    const [password , setPassword] = useState("") ;
    const [inputMessage, setInputMessage] = useState(false) ; 
    
    useEffect(() => {
        setInputMessage(false) ; 
        setLoginString( newUser ? "Existing User? Sign in here" : "New User? Create account here") ; 
    } , [newUser]) ; 
    
    const validateInput = () => {
        if(newUser){
            if(firstName === "" || lastName === "" || email === "" || password === ""){
                setInputMessage(true) ; 
                return false ; 
            }
            else {
                setInputMessage(false) ; 
                return true ; 
            }
        } else{
            if(email === "" || password === ""){
                // setInputMessage(true) ; 
                return false ; 
            }
            else {
                // setInputMessage(false) ; 
                return true ;
            }
        }
    }

    const handleLogin = async () => {
        let response = "" ; 
       if(!newUser){
            response = await axios.post(
                BASE_URL + "/login" , {email , password}, {withCredentials: true}
            ) ; 
       } else{
             response = await axios.post(
                BASE_URL + "/register" , {firstName , lastName , email , password}, {withCredentials: true}
            ) ; 
       }
       console.log(response) ;  
    } ; 

    return (
        <div className=" bg-white border border-gray-500 w-80 h-auto rounded-2xl mx-auto my-auto  mt-30 mb-2">
            <div>
                <h1 className=" text-black text-center text-2xl mt-4">Sign in or create account</h1>
                { newUser && 
                     <div className="flex flex-col space-y-2">
                     <label className="text-black font-medium mt-4 mx-auto my-auto">
                         First name
                     </label>
                     <input
                         type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="text-black  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                     </div>
                }
                 { newUser && 
                    <div className="flex flex-col space-y-2">
                    <label className="text-black font-medium mt-4 mx-auto my-auto">
                        Last name
                    </label>
                    <input
                        type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="text-black  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                    </div>
                }
                <div className="flex flex-col space-y-2">
                <label className="text-black font-medium mt-4 mx-auto my-auto">
                    Mobile number or email
                </label>
                <input
                    type="text" placeholder="Mobile number or email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                </div>
                <div className="flex flex-col space-y-2">
                <label className="text-black font-medium mt-4 mx-auto my-auto">
                    Password
                </label>
                <input
                    type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-black border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                </div>
                {  inputMessage &&  newUser && (firstName === "" || lastName === "" || email === "" || password === "") &&
                    <div className="flex justify-center">
                        <p className="text-red-400">Please fill all fields</p>
                    </div>
                } 
                  { inputMessage &&  !newUser && (email === "" || password === "") &&
                    <div className="flex justify-center">
                        <p className="text-red-400">Please fill all fields!</p>
                    </div>
                }
                <div className="flex justify-center mt-4">
                <button className="btn btn-success"  onClick={
                    () => {
                        const val = validateInput(); 
                        if(!val){
                            setInputMessage(true) ; 
                        }else{
                            setInputMessage(false) ; 
                            handleLogin() ; 
                        }

                    }
                } >{newUser ? "Register" : "Login"}</button>
                </div>
                <div  onClick={() => setNewUser(!newUser)}>
                    <p className="text-black flex justify-center mt-4 cursor-pointer">{loginString}</p>
                </div>
            </div>

        </div>
      

    )
} ; 

export default Login ;