import Header from "./Header";
import ChatWindow from "./ChatWindow" ; 
import Users from "./Users" ; 
import {useState , useEffect} from "react" ;
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const StartChat = () => {
    const [users , setUsers] = useState([]) ; 
    const [selectedUser , setSelectedUser] = useState(null) ; 
    const getAcceptedPeople = async () => {
        try{
            const response = await axios.get(BASE_URL + '/bookInterest/acceptedPeople' , {withCredentials: true}) ; 
            // const response = await axios.get(BASE_URL + '/bookInterest/interestReceived/ongoing' , {withCredentials: true}) ;
            setUsers(response.data.data) ; 
            console.log("response of accepted book interest API" , response) ; 
        } catch(Error){
            console.log("getAccepted Poeple blokc" , Error.message) ; 
        }
    }

    useEffect(() => {
        getAcceptedPeople() ; 
    } , []) ; 

    return (
        <div>
            <Header />
            <div className="flex flex-row flex-grow">
            <div  className="w-1/5 border-r border-gray-300 p-4 bg-gray-500 space-y-3 rounded-xl" >
                {
                    users?.map( user => ( 
                        <Users key={user._id} user={user} onSelect = { () => setSelectedUser(user)} isSelected = {selectedUser?._id === user._id} />
                    ))
                }

            </div>

            <div className="w-2/3 p-4">
                    {selectedUser ? (
                        <ChatWindow user={selectedUser} />
                    ) : (
                        <p className="text-gray-500 text-center">Select a user to start chatting</p>
                    )}
                </div>
        </div>
        </div>
    )
} ; 

export default StartChat ; 