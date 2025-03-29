
const Users = ({ user, onSelect, isSelected }) => {

    const convertToUpperCase = (name) => {
        const nameString = name.split(' ') ; 
        // console.log(nameString) ; 
        const firstName = nameString[0].charAt(0).toUpperCase() + nameString[0].slice(1) ; 
        const secondName = nameString[1].charAt(0).toUpperCase() + nameString[1].slice(1) ; 
        // console.log("edited names: ", firstName + ' ' + secondName)
        return firstName + ' ' + secondName ; 
    }

    console.log("user in user list",user) ; 
    let name = convertToUpperCase(user.interestedById.firstName + " " + user.interestedById.lastName) ;
    return (
        <div  className={`p-3 bg-white shadow-md h-10 rounded-3xl cursor-pointer 
            transition ${isSelected ? "bg-blue-300" : "hover:bg-gray-200"}`} 
        onClick={onSelect}>
            <p className="text-black font-medium">{name}</p>
        </div>
    )
} ; 

export default Users ; 