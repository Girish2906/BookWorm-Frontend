import {useState , useEffect} from 'react' ; 
import { BookInterestContext } from './BookCard';
import { useContext } from 'react';

const BookInterest = ({name}) => {

    const {bookInterest , setBookInterest} = useContext(BookInterestContext) ;
    console.log("this is the book interest",bookInterest , name) ; 
    // const {name} = bookInterest
    return (
       <div className="fixed top-15 left-1/2 transform -translate-x-1/2 bg-blue-100 w-96 p-4 rounded-lg shadow-lg z-50">
      <button 
        className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
        onClick={() => setBookInterest(false)}
      >
        ×
      </button>
      <h2 className="text-xl font-semibold text-black">Interested | {name}</h2>
      <p className="mt-2 text-gray-600">Members are more likely to accept an interest with a note</p>

      <div className="mt-4 flex justify-center gap-4">
        <button 
          className="btn btn-accent px-4 py-2"
          onClick={() => {
            console.log("Invitation Sent!");
            // setShowLoginAnimation(false);
          }}
        >
          Send
        </button>
        <button 
          className="btn btn-secondary px-4 py-2"
          onClick={() => setBookInterest(false) }
        >
          Cancel
        </button>
      </div>
  </div> )
} ; 

export default BookInterest ; 