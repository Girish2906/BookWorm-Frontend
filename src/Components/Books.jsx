import Header from "./Header";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {useState , useEffect , createContext} from 'react' ; 
import BookCard from "./BookCard";
import { useDispatch , useSelector } from "react-redux";
import Loading from "./Loading";
const ExploreLoginContext = createContext() ;  

const Books = () => {
    const user = useSelector(state => state.user) ; 
    // console.log("books.jsx user ",user , user.data) ; 
    const [isLogin , setIsLogin] = useState(  user.data ? false : true  ) ; 
    console.log(isLogin)
    const [showLoginAnimation , setShowLoginAnimation] = useState(false) ; 
    const [books , setBooks] = useState([]) ; 
    const fetchBooks = async () => {
        try{
            const response = await axios.get(BASE_URL + '/book/getAllBooks' , {withCredentials: true}) ; 
            setBooks(response.data.data) ; 
        } catch(Error){
            console.log(Error.message) ; 
        }
    } ; 
    const isUserLoggedIn = () => {
        console.log("is user logged in" , user) ; 
        if(user?.isSuccess){
          setIsLogin(true) ; 
        } else setIsLogin(false) ;
    }
    useEffect(() => {
        isUserLoggedIn() ; 
      } , [user]) ; 
    useEffect(() => {
        fetchBooks() ; 
    } , []) ; 
    return (
        <ExploreLoginContext.Provider value={{isLogin , setIsLogin , showLoginAnimation , setShowLoginAnimation}}>
            <Header/>
           {
            !books.length ?
            <Loading color={{color: 'white'}} />
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