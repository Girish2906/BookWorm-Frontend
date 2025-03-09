const Loading = ({color}) => {
    const colorLoader = color.color ; 
    console.log(colorLoader) ; 
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
        <div
          className="animate-spin border-solid rounded-full h-16 w-16"
          style={{ borderTopColor: colorLoader, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'transparent', borderWidth: '4px' }}
        ></div>
      </div>
      ) ; 
} ; 

export default Loading ; 