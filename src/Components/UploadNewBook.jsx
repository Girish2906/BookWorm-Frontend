import Header from "./Header";
import { useExploreLogin } from "./Context";
// import { useContext } from "react";
// import { ExploreLoginContext } from './Books';

const UploadNewBook = () => {
    const { isLogin, setIsLogin, showLoginAnimation, setShowLoginAnimation } = useExploreLogin(); 
    // const { isLogin, setIsLogin, showLoginAnimation, setShowLoginAnimation } = useContext(ExploreLoginContext);
    return (
        <div>
            {/* upload new book */}
            <Header/>
        </div>
    )
} ; 

export default UploadNewBook ; 