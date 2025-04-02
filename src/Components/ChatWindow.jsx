import { useDispatch , useSelector } from "react-redux";
import axios from "axios";
import {useState , useEffect} from "react" ; 
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const ChatWindow = ({ user }) => {

    // const [messages , setMessages] = useState([{text: "Hello World"}]) ; 
    const [messages , setMessages] = useState([]) ; 
    const [newMessage , setNewMessage] = useState("") ; 
    const loggedInUser = useSelector(state => state.user) ; 
    // console.log("loggedInUser" , loggedInUser , user) ; 
    const userId = loggedInUser?.data?._id ; 
    const targetUserId  = user?.chatPerson?._id; 
    // console.log(15 , userId , targetUserId) ; 
    const firstName = user?.chatPerson?.firstName ; 
    const secondName = user?.chatPerson?.lastName ; 

    useEffect(() => {
        if(!userId) return ; 
        const socket = createSocketConnection() ; 
        socket.emit("joinChat" , {userId , targetUserId , firstName}) ;  

        socket.on("messageReceived" , ({firstName , newMessage , _id}) =>{
            console.log("message received in front end:  ",newMessage) ; 
            // setMessages([...messages , {firstName , text: newMessage}]) ; 
            setMessages( (messages) => {  return [...messages , {firstName , text: newMessage , _id }] } ) ; 
            console.log(firstName , newMessage , " messageReceived function socket " , messages) ; 
        } )

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
     let name = convertToUpperCase(user?.chatPerson?.firstName + " " + user?.chatPerson?.lastName) ;

    // } 
    // const name = convertToUpperCase(interestedById?.firstName + " " + interestedById?.lastName) ;

    const sendMessage = () => {
        if(!newMessage) return ;
        console.log(newMessage);
        const socket = createSocketConnection() ; 
        const firstName = loggedInUser?.data?.firstName ;
        socket.emit("sendMessage" , { firstName ,  userId , targetUserId , newMessage , _id: loggedInUser?.data?._id} ) ; 
        setNewMessage('') ; 
    }

    const {interestedById} = user ; 

    return (
        <div className="p-4 border rounded-lg bg-gray-400">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="flex-grow bg-gray-200 p-4 mt-3 rounded-lg shadow-inner overflow-y-auto">
            <div className="flex flex-col space-y-2">
                {messages?.length > 0 &&
                messages?.map((message, index) => (
                    <p
                    key={index}
                    className={`p-2 rounded-lg break-words max-w-[70%] ${
                        loggedInUser?.data?._id === message._id
                        ? "bg-blue-500 text-white text-right ml-auto"
                        : "bg-white text-gray-900 text-left mr-auto"
                    }`}
                    >
                    {message.text}
                    </p>
                ))}
            </div>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-gray-500">
            <input
                type="text"  value={newMessage} onChange={(e) => setNewMessage(e.target.value)}  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage(); // Function to send the message
                    }
                  }}
                className="flex-grow p-2 border rounded-lg" 
                placeholder="Type a message..."
            />
            <button className="p-2 bg-blue-500 text-white rounded-4xl hover:bg-blue-600" onClick={sendMessage} >
                Send
            </button>
            </div>
        </div>
    );
} ; 

export default ChatWindow ; 