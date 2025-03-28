import {useState , useEffect} from 'react' ; 
import { BookInterestContext } from './BookCard';
import { useContext } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { BASE_URL } from '../utils/constants';

const BookInterest = ({book}) => {
    const {name , bookId} = book ; 
    console.log(name , bookId) ; 
    const {bookInterest , setBookInterest} = useContext(BookInterestContext) ;
    const [addNote , setAddNote] = useState(false) ; 
    const [note , setNote] = useState("") ; 
    const [lengthOfNote , setLengthOfNote] = useState(0) ; 
    const [loading , setLoading] = useState(false) ; 
    const [noteLengthExceed , setNoteLengthExceed] = useState('text-gray-600') ; 
    // console.log("this is the book interest",bookInterest , name) ; 

    const sendInterest = async () => {
      setLoading(true) ; 
      try{
        const response = await axios.post(BASE_URL + "/bookInterest1/interested/" + bookId , { bookInterestId: "" , initialMessage: note} , {withCredentials: true}) ; 
        // console.log(response) ; 
        setLoading(false) ; 
        setBookInterest(false) ;
      } catch(Error){
        console.log("sendInterest API: " , Error.message) ; 
      }
    }

    return (
       <div className="fixed top-15 left-1/2 transform -translate-x-1/2 bg-blue-100 w-96  p-4 rounded-lg shadow-lg z-50">
      <button 
        className=" cursor-pointer absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
        onClick={() => setBookInterest(false)}
      >
        ×
      </button>
      <h2 className="text-xl font-semibold text-black">Interested | {name}</h2>
      <p className="mt-2 text-gray-600">Members are more likely to accept an interest with a note</p>
      {addNote && (
  <textarea
    className="w-full p-2 border h-24 text-black bg-gray-100 rounded-2xl"
    placeholder="Enter your note here..."
    value={note}
    onChange={(e) => {
      const newValue = e.target.value; 
      const newLength = newValue.length;

      setNote(newValue);
      setLengthOfNote(newLength);

      if (newLength > 80) {
        setNoteLengthExceed('text-red-400');
      } else {
        setNoteLengthExceed('text-gray-600');
      }
      
      console.log(newValue);
    }}
  />
)}

      {
        addNote && 
       ( <div className={ `text-right` + `${noteLengthExceed}` }> 
          {lengthOfNote}/80
        </div> )
      }
      <div className="mt-4 flex justify-end gap-4">
        <button 
          className=" bg-white text-gray-600 rounded-3xl border-2 cursor-pointer  px-4 py-2"
          onClick={() => {
            console.log("Invitation Sent!");
            setAddNote(addNote ? false : true) ; 
            // setShowLoginAnimation(false);
          }}
        >
          {!addNote ? 'Add a note': 'Cancel'}
        </button>
        <button 
          className="bg-blue-600 text-white rounded-3xl  cursor-pointer  px-4 py-2"
          onClick={() => { sendInterest()} }
        >
         {  addNote ? 'Send' : 'Send without a note'  }
        </button>
      </div>
      {
        loading && <Loading color={{color: "black"}}/>
      }
  </div> )
} ; 

export default BookInterest ; 