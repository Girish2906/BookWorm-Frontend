import { useDispatch , useSelector } from "react-redux";
import axios from "axios";
import {useState , useEffect} from "react" ; 
import { BASE_URL } from "../utils/constants";

const ChatWindow = ({ user }) => {

    const convertToUpperCase = (name) => {
        const nameString = name.split(' ') ; 
        // console.log(nameString) ; 
        const firstName = nameString[0].charAt(0).toUpperCase() + nameString[0].slice(1) ; 
        const secondName = nameString[1].charAt(0).toUpperCase() + nameString[1].slice(1) ; 
        // console.log("edited names: ", firstName + ' ' + secondName)
        return firstName + ' ' + secondName ; 
    }

    const {interestedById} = user ; 
    const name = convertToUpperCase(interestedById.firstName + " " + interestedById.lastName) ;
    console.log("7 chatWindow" , user) ; 
    // const user = useSelector(state => state.user) ; 
    
    // useEffect(() => {
    //     const fetchChats = async () => {
    //         try{
    //             const response = await axios.get(BASE_URL + "/bookInterest/interestsReceived/ongoing" , {withCredentials: true}) ; 
    //             console.log("response from ongoing chats" , response) ; 
    //         } catch(Error){
    //             console.log(Error.message) ; 
    //         }
    //     }
    // } , []) ; 

    return (
        <div className="p-4 border rounded-lg bg-gray-400">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="flex-grow bg-gray-200 p-4 mt-3 rounded-lg shadow-inner overflow-y-auto">
                <p className="text-gray-700">Chat messages will appear here...</p>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-gray-500">
            <input 
                type="text" 
                className="flex-grow p-2 border rounded-lg" 
                placeholder="Type a message..."
            />
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Send
            </button>
            </div>
        </div>
    );
} ; 

export default ChatWindow ; 