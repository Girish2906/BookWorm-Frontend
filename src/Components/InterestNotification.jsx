import { useState , useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const InterestNotification = ({interest , onRefresh}) => {
    console.log("interestnotification.jsx",interest ) ; 
    const bookInterestId = interest?._id ; 
    const interestedBookId = interest?.interestedBook?._id ; 
    const startChatting = async () => {
        try{
            const response = await axios.post(BASE_URL + '/bookInterest1/ongoing/' + interestedBookId , {bookInterestId} , {withCredentials: true} ) ; 
            console.log("bookInterest1ongoing API POST call " ,response) ;
            onRefresh();
            window.open("/chat", "_blank");
        } catch(Error){
            console.log(" start chatting block",Error.message) ; 
        }
    } ; 

    const initialMessage = interest?.initialMessage ; 
    const { createdAt} = interest ; 
    const date = new Date(createdAt) ; 
    const formattedDate = date.toLocaleString("en-IN", { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        hour12: true 
      });
    const convertToUpperCase = (name) => {
        const nameString = name.split(' ') ; 
        // console.log(nameString) ; 
        const firstName = nameString[0].charAt(0).toUpperCase() + nameString[0].slice(1) ; 
        const secondName = nameString[1].charAt(0).toUpperCase() + nameString[1].slice(1) ; 
        // console.log("edited names: ", firstName + ' ' + secondName)
        return firstName + ' ' + secondName ; 
    }
    const name = interest.interestedPerson.firstName + " " + interest.interestedPerson.lastName ;   
    const nameOfTheBook = interest?.interestedBook?.name ; 
    return (
        <div  className="border w-80 h-auto bg-gray-400 p-4 rounded-lg shadow-md flex flex-col">
            <p className="text-black text-3xl font-bold">{convertToUpperCase(name)}</p>
            <p className="text-black text-2xl font-medium">{nameOfTheBook}</p>
            <p className="text-black font-semibold">{formattedDate}</p>
            <p className="text-black font-light">{initialMessage}</p>
            <div className="flex justify-between mt-auto bg-gray-700 p-2 rounded-b-lg">
               <div> 
                    <button className="btn btn-primary">Decline</button>
                </div>
               <div>
                    <button className="btn btn-success" onClick={startChatting} >Accept</button>
                </div>
            </div>
        </div>
    ) ; 
} ; 

export default InterestNotification ; 