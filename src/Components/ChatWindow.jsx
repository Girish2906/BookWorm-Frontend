import { useDispatch , useSelector } from "react-redux";
import axios from "axios";
import {useState , useEffect} from "react" ; 
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const ChatWindow = ({ user }) => {

    const [messages , setMessages] = useState([{text: "Hello World"}]) ; 
    const [newMessage , setNewMessage] = useState("") ; 
    const loggedInUser = useSelector(state => state.user) ; 
    console.log("loggedInUser" , loggedInUser , user) ;
    const userId = loggedInUser?.data?._id ; 
    const targetUserId  = user?._id; 
    console.log(15 , userId , targetUserId) ; 
    useEffect(() => {
        if(!userId) return ; 
        const socket = createSocketConnection() ; 
        socket.emit("joinChat" , {userId , targetUserId}) ;  
        return () => {
            socket.disconnect() ; 
        }
    } , [userId , targetUserId]) ; 

    const convertToUpperCase = (name) => {
        const nameString = name.split(' ') ; 
        // console.log(nameString) ; 
        const firstName = nameString[0].charAt(0).toUpperCase() + nameString[0].slice(1) ; 
        const secondName = nameString[1].charAt(0).toUpperCase() + nameString[1].slice(1) ; 
        // console.log("edited names: ", firstName + ' ' + secondName)
        return firstName + ' ' + secondName ; 
    }
    // let name = '' ; 
    // if(interestedById){
     let name = convertToUpperCase(user?.interestedById?.firstName + " " + user?.interestedById?.lastName) ;

    // } 
    // const name = convertToUpperCase(interestedById?.firstName + " " + interestedById?.lastName) ;

    const sendMessage = () => {
        const socket = createSocketConnection() ; 
        socket.emit("sendMessage" , (name ,  userId , targetUserId , newMessage) => {

        })
    }

    const {interestedById} = user ; 
    console.log("7 chatWindow" , user) ; 
    // const user = useSelector(state => state.user) ; 

    return (
        <div className="p-4 border rounded-lg bg-gray-400">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="flex-grow bg-gray-200 p-4 mt-3 rounded-lg shadow-inner overflow-y-auto">
                <p className="text-gray-700">Chat messages will appear here...</p>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-gray-500">
            <input 
                type="text"  value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 border rounded-lg" 
                placeholder="Type a message..."
            />
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={sendMessage} >
                Send
            </button>
            </div>
        </div>
    );
} ; 

export default ChatWindow ; 