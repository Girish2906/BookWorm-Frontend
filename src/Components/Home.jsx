import Header from "./Header";
import axios from 'axios';
import {useState , useEffect} from "react" ;
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Home = () => {
  const dispatch = useDispatch() ; 
  const fetchUser = async () => {
    try{
      const response = await axios.get(BASE_URL + "/profile" , {withCredentials: true}) ;  
      console.log('HOME.jsx'  ,response) ; 
      if(response.status === 200){
        console.log("response.data: )()", response.data) ;
        dispatch(addUser(response.data)) ; 
      }
    } catch(Error){
      console.log("this is the error message: ",  Error ,Error.message) ; 
    }
  } 

  useEffect(() => {
    fetchUser() ; 
  } , []) ; 

    return (
            <>
              <Header />
              <div className="absolute inset-0 -z-10">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://cdn.pixabay.com/photo/2016/01/19/01/42/library-1147815_640.jpg')`,
                  }}
                ></div>
                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/10"></div>
              </div>
            </>
      );
      
} ; 

export default Home; 