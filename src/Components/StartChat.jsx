import Header from "./Header";
import ChatWindow from "./ChatWindow" ; 
import Users from "./Users" ; 


const StartChat = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-row flex-grow">
            <div className="w-1/3 border-r border-gray-300 p-4 bg-gray-100">
                <Users />
            </div>

            <div className="w-2/3 p-4">
                <ChatWindow />
            </div>
        </div>
        </div>
    )
} ; 

export default StartChat ; 