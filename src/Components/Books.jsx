import Header from "./Header";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {useState , useEffect , createContext} from 'react' ; 
import BookCard from "./BookCard";
import { useDispatch , useSelector } from "react-redux";
const ExploreLoginContext = createContext() ;  

const Books = () => {
    const user = useSelector(state => state.user) ; 
    // console.log("books.jsx user ",user) ; 
    const [isLogin , setIsLogin] = useState(false) ; 
    const [showLoginAnimation , setShowLoginAnimation] = useState(false) ; 
    const [books , setBooks] = useState([]) ; 
    // console.log("values sending in the context" , isLogin , setIsLogin , showLoginAnimation , setShowLoginAnimation)  ; 
    // console.log("these are the books to show in the book card" , books) ; 
    const fetchBooks = async () => {
        try{
            const response = await axios.get(BASE_URL + '/book/getAllBooks' , {withCredentials: true}) ; 
            setBooks(response.data.data) ; 
        } catch(Error){
            console.log(Error.message) ; 
        }
    } ; 
    const isUserLoggedIn = () => {
        if(user){
          setIsLogin(true) ; 
        } else setIsLogin(false) ;
    }
    useEffect(() => {
        isUserLoggedIn() ; 
      } , [user]) ; 
    useEffect(() => {
        fetchBooks() ; 
    } , []) ; 
    console.log(isLogin , setIsLogin , showLoginAnimation , setShowLoginAnimation)
    return (
        <ExploreLoginContext.Provider value={{isLogin , setIsLogin , showLoginAnimation , setShowLoginAnimation}}>
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
            books.map(book => (   <BookCard key={book._id}  book ={book} /> ) )

            // books.map(book => (   <BookCard   book ={book} /> ) )
        }
            </ExploreLoginContext.Provider>
    )
} ; 
export {ExploreLoginContext} ; 

export default Books ; 