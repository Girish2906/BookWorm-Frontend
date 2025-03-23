import { useState , useEffect } from "react";

const InterestNotification = ({interest}) => {
    // console.log(interest) ; 
    const initialMessage = interest.initialMessage ; 
    const { createdAt} = interest.interestedById ; 
    const name = interest.interestedById.firstName + " " + interest.interestedById.lastName ; 
    const nameOfTheBook = interest.bookId.name ; 
    console.log(name, nameOfTheBook , createdAt)
    return (
        <div className="  bg-gray-300">
            <h2>{name}</h2>
            <h2>{nameOfTheBook}</h2>
            <h2>{createdAt}</h2>
            {/* <h2>{name}</h2> */}
        </div>
    ) ; 
} ; 

export default InterestNotification ; 