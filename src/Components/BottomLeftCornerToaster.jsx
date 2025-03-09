const BottomLeftCornerToaster = ({message}) => {
    return (
        <div className="fixed bottom-4 left-4 bg-red-600 text-white p-3 rounded-md shadow-lg">
        {message.message}
        <div className="h-1 bg-white mt-2 animate-slide"></div>
      </div>
      
    )
} ; 

export default BottomLeftCornerToaster ; 