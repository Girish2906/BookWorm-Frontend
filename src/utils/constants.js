export const BASE_URL2 = "http://localhost:3000" ;

console.log("constants file",window.location.href.split('/') , window.location.href.split('/').includes("localhost:5173")) ; 
 
export const BASE_URL = window.location.href.split('/').includes("localhost:5173") ?  "http://localhost:3000" : "https://bookworm-backend-14kp.onrender.com"  ; 