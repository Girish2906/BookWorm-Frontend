import Header from "./Header";
import Loading from "./Loading";
import InterestNotification from "./InterestNotification";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState , useEffect } from "react";

const Notification = () => {
    const [loading , setLoading] = useState(true) ; 
    const [interests , setInterests] = useState([]) ; 
    const getAllInterests = async () => {
        console.log("getAllInterests") ; 
        try{
            const response = await axios.get(BASE_URL + '/bookInterest/getAllInterests' , {withCredentials: true}) ; 
            setLoading(false) ; 

            setInterests(response.data.data) ; 
            console.log(response) ; 
        } catch(Error){
            console.log(Error.message) ; 
        }
    } ; 

    useEffect(() => {
        getAllInterests() ; 
    } , []) ; 

    return (
        <div>
            <Header/>
            { !loading  && 
                (
                    <div className="flex flex-wrap gap-4 p-4 justify-center">
                        {interests.map((interest, index) => (
                            <InterestNotification key={index} interest={interest} />  
                        ))}
                    </div>

                )
            }
            {
                loading && <Loading color = {{color: "white"}}/>
            }
        </div>        
    ) 
} ; 

export default Notification ; 