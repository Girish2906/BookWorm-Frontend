import Header from "./Header";
import ChatWindow from "./ChatWindow" ; 
import Users from "./Users" ; 
import {useState , useEffect} from "react" ;
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const StartChat = () => {

    const getAcceptedPeople = async () => {
        try{
            const response = await axios.get(BASE_URL + '/bookInterest/acceptedPeople' , {withCredentials: true}) ;
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