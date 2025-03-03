import {useState , useEffect} from "react" ;

const BookCard = ({book}) => {
    const {author , genre , image , name , pages , price} = book ;
    // const uploadedAt = new Date(book.updatedAt) ;  
    const date = new Date(book.updatedAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const uploadedAt =  date.toLocaleDateString(undefined, options);
    // const uplooadedAt = book
    // console.log("this is the book card " , book) ; 
    // console.log(image)
    return (
      <div className="mx-auto items-center justify-center border-2 rounded-2xl w-7xl h-90 p-3 relative mb-3">
      <div className="flex flex-row">
        <div className="absolute top-5 left-8">
          <img
            className="h-80 w-80 object-contain" // Changed to object-contain
            src={"data:image/png;base64," + image}
            alt="Book Cover"
          />
        </div>
        <div className="flex flex-col ml-96 mt-5 space-y-5">
        <h1 className="text-3xl font-bold text-white">{name}</h1> {/* White for high contrast */}
        <h2 className="text-xl font-semibold text-gray-200">by {author} | {uploadedAt} </h2> {/* Light gray for readability */}
        <h2 className="text-xl font-semibold text-gray-200">₹ {price}</h2> {/* Light gray for readability */}
        <p className="text-lg font-semibold text-gray-300">{genre}</p> {/* Lighter gray for hierarchy */}
        <h4 className="text-lg font-semibold text-gray-300">{pages} pages</h4> {/* Lighter gray for hierarchy */}
        <div>
    <button
      className="btn btn-accent cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={() => { console.log("hello world"); }}
    >
      Explore
    </button>
  </div>
      </div>
      </div>
    </div>
    )
} ; 

export default BookCard ; 