import Header from "./Header";
import { useExploreLogin } from "./Context";
import { useState , useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
// import { useContext } from "react";
// import { ExploreLoginContext } from './Books';

const UploadNewBook = () => {
  const { isLogin, setIsLogin, showLoginAnimation, setShowLoginAnimation } =
    useExploreLogin();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name , setName] = useState('') ; 
  const [author , setAuthor] = useState('') ; 
  const [genres , setGenres] = useState([]) ; 
  const [pages , setPages] = useState() ; 
  const [price , setPrice] = useState() ; 
  const [allFieldsMandatory , setAllFieldsMandatory] = useState(false) ; 
  const [coverImage , setCoverImage] = useState() ; 
  let fileBase64 = '' ; 

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file
  
    if (file) {
      const base64 = await convertToBase64(file);
      console.log(base64) ; 
      fileBase64 = base64 ; 
    }
  };
  
  // Function to convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Get only Base64 part
      reader.onerror = (error) => reject(error);
    });
  };
  

  const fetchGenres = async () => {
    const response = await axios.get(BASE_URL + '/book/genres' , {withCredentials: true} ) ; 
    setGenres(response.data.data) ; 
    console.log(response) ; 
  }

  useEffect(() =>{
    fetchGenres() ; 
  } , []) ; 

  const newBook = async () => {
    console.log("new book" , name , author , pages , price  , fileBase64, genres ) ; 
    if(!name || !author || !pages || !price || !selectedGenres.length || !fileBase64.length ){
      setAllFieldsMandatory(true) ; 
      setTimeout(() => {
        setAllFieldsMandatory(false) ; 
      } , 2000) ; 
    } else{
      const formData = new FormData() ; 
      formData.append('name' , name) ; 
      formData.append('author' , author) ; 
      formData.append('pages'  , pages) ; 
      formData.append('genre' , selectedGenres) ; 
      formData.append('price' , price) ; 
      formData.append('image' , fileBase64) ; 
      const response = await axios.post(BASE_URL + '/upload/Book' , formData , {withCredentials: true}) ; 
      console.log("this is the coming response: ",response) ; 
    }
  }

  const fileCheck = (event) => {
    console.log(event.target , event.target.files)
    console.log("filecheck fuynction")
  }


  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div className="p-6 rounded-lg  w-96">
          <h2 className="text-xl font-bold text-center mb-4">Book Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-24 text-gray-100">Name</label>
              <input className="input input-bordered w-full" type="text"  value={name}  onChange={(e) => {setName(e.target.value)}} />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-100">Author</label>
              <input type="text" className="input input-bordered w-full"  value={author}  onChange={(e) => {setAuthor(e.target.value)}} />
            </div>

            <div className="flex items-center relative">
              <label className="w-24 text-gray-100">Genres</label>
              <div
                className="input input-bordered w-full cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedGenres.length > 0
                  ? selectedGenres.join(", ")
                  : "Select genres"}
              </div>

              {isDropdownOpen && (
                <div className="absolute left-24 top-full w-[calc(100%-6rem)] mt-1 bg-gray-400 shadow-lg rounded-lg p-2 z-50 max-h-40 overflow-y-auto">
                  {genres.map((genre) => (
                    <div
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`p-2 hover:bg-gray-200 rounded cursor-pointer ${
                        selectedGenres.includes(genre)
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-100">Pages</label>
              <input type="number" className="input input-bordered w-full"  value={pages}  onChange={(e) => {setPages(e.target.value)}} />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-100">Price</label>
              <input type="number" className="input input-bordered w-full"  value={price}  onChange={(e) => {setPrice(e.target.value)}} />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-gray-100">Cover</label>
              <input type="file" className="file-input" onChange={handleFileUpload} />
            </div>
          </div>
         <div className="flex justify-center">
          {
            allFieldsMandatory &&   <p className="text-red-500">All fields are mandatory</p>
          }
         </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary" onClick={ newBook  }>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNewBook;
