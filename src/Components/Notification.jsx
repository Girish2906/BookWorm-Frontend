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
    useEffect(() => {
        console.log("this is the loading variable" , loading) ;  
    } , [loading]) ; 
    return (
        <div>
            <Header/>
            { !loading  && 
                interests.map(interest => <InterestNotification interest = {interest}/> )
            }
            {
                loading && <Loading color = {{color: "white"}}/>
            }
        </div>        
    ) 
} ; 

export default Notification ; 