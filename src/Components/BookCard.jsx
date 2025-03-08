import {useState , useEffect , useContext } from "react" ; 
import {ExploreLoginContext} from "./Books" ; 
import BookInterest from "./BookInterest";
import { createContext } from "react";

const BookInterestContext = createContext() ; 

const BookCard = ({book}) => {
    const {isLogin , setIsLogin , showLoginAnimation , setShowLoginAnimation} = useContext(ExploreLoginContext) ; 
    const {author , genre , image , name , pages , price} = book ; 
    const {firstName , lastName} = book.uploadedById ; 
    const [bookInterest , setBookInterest] = useState(false) ; 

    const date = new Date(book.updatedAt);
    // console.log(date , new Date() , new Date() - date ) ; 
    // console.log(new Date() , new Date(book.updatedAt) , new Date() - new Date(book.updatedAt)  )
    const numberOfDays = Math.floor((new Date().getTime() - date.getTime())/(1000*24*60*60)) ; 
    // console.log(numberOfDays)
    // console.log("daysInMilliseconds" , daysInMilliseconds , (daysInMilliseconds*1000) / (1000*24*60*60) )
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // console.log(book) ; 

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
  
  const checkExplore = () => {} ; 
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
        <h4 className="text-lg font-semibold text-gray-300">Uploaded By {firstName + ' ' + lastName + ' ' + numberOfDays} days before </h4>
        <div>
    <button
      className="btn btn-accent cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={() => { 
        if(!isLogin){
          setShowLoginAnimation(true) ; 
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else{
          checkExplore() ; 
          setBookInterest(true); 
        }
       }}
    >
      Explore
      {  
        // console.log("Rendering condition: ", bookInterest)
      }
    </button>
  </div>
  {
    bookInterest && 
    <BookInterest name={name} />
  //   <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-100 w-96 p-4 rounded-lg shadow-lg z-50">
  //     <button 
  //       className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
  //       onClick={() => setBookInterest(false)}
  //     >
  //       ×
  //     </button>
  //     <h2 className="text-xl font-semibold text-black">Interested | {name}</h2>
  //     <p className="mt-2 text-gray-600">Members are more likely to accept an interest with a note</p>

  //     <div className="mt-4 flex justify-center gap-4">
  //       <button 
  //         className="btn btn-accent px-4 py-2"
  //         onClick={() => {
  //           console.log("Invitation Sent!");
  //         }}
  //       >
  //         Send
  //       </button>
  //       <button 
  //         className="btn btn-secondary px-4 py-2"
  //         onClick={() => setBookInterest(false) }
  //       >
  //         Cancel
  //       </button>
  //     </div>
  // </div>
  }
      </div>
      </div>
    </div>
    </BookInterestContext.Provider>
    )
} ; 

export default BookCard ; 
export {BookInterestContext}