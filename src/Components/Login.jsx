import { useState } from "react";

const Login = () => {

    const [newUser , setNewUser] = useState(true) ; 

    return (
        <div className=" bg-white border border-gray-500 w-80 h-auto rounded-2xl mx-auto my-auto  mt-30">
            <div>
                <h1 className=" text-black text-center text-2xl mt-4">Sign in or create account</h1>
                { newUser && 
                    <div className="flex flex-col space-y-2">
                    <label className="text-black font-medium mt-4 mx-auto my-auto">
                        First name
                    </label>
                    <input
                        type="text" placeholder="first name" className="text-black  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                    </div>
                }
                 { newUser && 
                    <div className="flex flex-col space-y-2">
                    <label className="text-black font-medium mt-4 mx-auto my-auto">
                        Last name
                    </label>
                    <input
                        type="text" placeholder="Last name" className="text-black  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                    </div>
                }
                <div className="flex flex-col space-y-2">
                <label className="text-black font-medium mt-4 mx-auto my-auto">
                    Mobile number or email
                </label>
                <input
                    type="text" placeholder="Mobile number or email" className="text-black  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                </div>
                <div className="flex flex-col space-y-2">
                <label className="text-black font-medium mt-4 mx-auto my-auto">
                    Password
                </label>
                <input
                    type="password" placeholder="Password" className="text-black border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto my-auto" />
                </div>

                <div className="flex justify-center mt-4">
                <button className="btn btn-success">Login</button>
                </div>
                <div onClick={() => setNewUser(!newUser)}>
                    <p className="text-black flex justify-center mt-4" >New user? Sign up here</p>
                </div>
            </div>

        </div>
      

    )
} ; 

export default Login ; 