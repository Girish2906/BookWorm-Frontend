import {useState , useEffect , useContext } from "react" ; 
import {ExploreLoginContext} from "./Books" ; 
import BookInterest from "./BookInterest";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from 'axios' ; 
import BottomLeftCornerToaster from "./BottomLeftCornerToaster" ; 

const BookInterestContext = createContext() ; 

const BookCard = ({book}) => {
  const user = useSelector((state) => state.user) ; 
  // console.log("this is the user" , user) ; 
  // console.log(book) ; 
    const {isLogin , setIsLogin , showLoginAnimation , setShowLoginAnimation} = useContext(ExploreLoginContext) ; 
    const {author , genre , image , name , pages , price} = book ; 
    const {firstName , lastName} = book.uploadedById ; 
    const date = new Date(book.createdAt
    );
    const [bookInterest , setBookInterest] = useState(false) ; 
    const [multipleRequestNotAllowed , setMultipleRequestNotAllowed ] = useState(false) ; 
    
    const numberOfDays = Math.floor((new Date().getTime() - date.getTime())/(1000*24*60*60)) ; 
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    let timerReturn ; 
    if(! isLogin){
      timerReturn  = setTimeout(() => {
        setShowLoginAnimation(false) ; 
      } , 1000) ; 
    }
    return () => clearTimeout(timerReturn) ; 
  } , [showLoginAnimation]) ; 

  //useEffect for disabling the scroll when the popup is visible
  useEffect(() => {
    if (bookInterest) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to reset scroll behavior when popup is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [bookInterest]);
  
  const checkExplore = async () => {
   try{
    console.log("try catch")
      const bookId = book._id ; 
      const interestedById = user?.data?._id ; 
      const response = await axios.post(BASE_URL + "/bookInterest/find" , {bookId , interestedById} , {withCredentials: true}) ; 
      console.log("!$#!$",response , response.data.length) ; 
      if(response.data.length !== 0){
        setBookInterest(false) ; 
        setMultipleRequestNotAllowed(true) ; 
        setTimeout(() => {setMultipleRequestNotAllowed(false)} , 1900) ; 
      } else{setBookInterest(true) ; }
   } catch(Error){
    console.log(Error.message) ; 
   }
    //  const interestedById

  } ; 
  const uploadedAt =  date.toLocaleDateString(undefined, options);
    return (
      <BookInterestContext.Provider value={{bookInterest , setBookInterest}} >
      <div className="mx-auto items-center justify-center border-2 rounded-2xl w-5xl h-auto p-3 relative mb-3">
      <div className="flex flex-row">
        <div className="absolute top-5 left-8">
          <img
            className="h-80 w-80 object-contain" // Changed to object-contain
            src={"data:image/png;base64," + image}
            alt="Book Cover"
          />
        </div>
        <div className="flex flex-col ml-96 mt-5 space-y-5">
        <h1 className="text-3xl font-bold text-white">{name}</h1> 
        <h2 className="text-xl font-semibold text-gray-200">by {author} | {uploadedAt} </h2> 
        <h2 className="text-xl font-semibold text-gray-200">₹ {price}</h2> 
        <p className="text-lg font-semibold text-gray-300">{genre}</p> 
        <h4 className="text-lg font-semibold text-gray-300">{pages} pages</h4>
        <h4 className="text-lg font-semibold text-gray-300">Uploaded By {firstName + ' ' + lastName + ' ' + (numberOfDays ?  `${numberOfDays} days before` : ' today' ) } </h4>
        <div>
    <button
      className="btn btn-accent cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={() => { 
        if(!isLogin){
          setShowLoginAnimation(true) ; 
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else{
          checkExplore() ; 
        }
       }}
    >
      Explore
    </button>
  </div>
  {
    bookInterest && 
    <BookInterest book={{name , bookId: book._id}} />
  }
      </div>
      </div>
    </div>
    {
      multipleRequestNotAllowed && (<BottomLeftCornerToaster message = {{message: "Request Already Sent" , color: 'red'}}  />)
    }
     <style>
        {`
          @keyframes slide {
            from { width: 100%; }
            to { width: 0%; }
          }
          
          .animate-slide {
            animation: slide 2s linear forwards;
          }
        `}
      </style>
    </BookInterestContext.Provider>
    )
} ; 

export default BookCard ; 
export {BookInterestContext}