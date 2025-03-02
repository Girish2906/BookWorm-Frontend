import Header from "./Header";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {useState , useEffect} from 'react' ; 
import BookCard from "./BookCard";

const Books = () => {

    const [books , setBooks] = useState([]) ; 
    // console.log("these are the books to show in the book card" , books) ; 
    const fetchBooks = async () => {
        try{
            const response = await axios.get(BASE_URL + '/getAllBooks' , {withCredentials: true}) ; 
            // console.log(response) ; 
            setBooks(response.data.data) ; 
        } catch(Error){
            console.log(Error.message) ; 
        }
    } ; 
    
    useEffect(() => {
        fetchBooks() ; 
    } , []) ; 

    return (
            <>
            <Header/>
           {
            !books.length ?
            <div className="flex justify-center items-center">
            <div className="w-64 h-40  rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_5.5s_infinite]"></div>
            </div>
          </div>
             :  
            //  <div>random test</div>
                books.map(book => (  <BookCard book ={book} /> ) )
           }
            </>
    )
} ; 

export default Books ; 