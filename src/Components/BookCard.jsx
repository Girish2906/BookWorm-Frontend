import {useState , useEffect} from "react" ;

const BookCard = ({book}) => {
    const {author , genre , image , name , pages } = book ; 
    // console.log("this is the book card " , book) ; 
    // console.log(image)
    return (
        <div className="mx-auto items-center justify-center border-2 rounded-2xl w-7xl h-90 p-3 relative"> {/* Add relative positioning to the container */}
    <div className="flex flex-row">
      <div className="w-60 h-60 bg-blue-900 mt-12 pl-10 relative"> {/* Add relative positioning to the blue div */}
        <div className="absolute top-5 left-8 right-8"> {/* Add absolute positioning to the image div */}
          <img className="h-20 w-20 object-cover" src={"data:image/png;base64," + image} alt="Book Cover" />
        </div>
      </div>
      {/* <div>{name}</div>
      <div>{author}</div>
      <div>{pages}</div>
      <div>{genre}</div> */}
    </div>
  </div>
    )
} ; 

export default BookCard ; 