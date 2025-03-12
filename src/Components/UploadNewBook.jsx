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
  const [genres , setGenres] = useState([]) ; 
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchGenres = async () => {
    const response = await axios.get(BASE_URL + '/book/genres' , {withCredentials: true} ) ; 
    setGenres(response.data.data) ; 
    console.log(response) ; 
  }

  useEffect(() =>{
    fetchGenres() ; 
  } , []) ; 


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
              <input type="text" className="input input-bordered w-full" />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-100">Author</label>
              <input type="text" className="input input-bordered w-full" />
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
              <input type="number" className="input input-bordered w-full" />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-100">Price</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNewBook;
