
import { checkToken } from "../apiUtils/apiCalls"

const tokenChecker = async () => {
    const token = localStorage.getItem('token');
    if( token === null) {
        console.log("No token found in localStorage");
        return Promise.resolve(false); 
    }
    const response = await checkToken(token);
    console.log("Response from checkToken:", response);
    if (response.success === false) {
        localStorage.removeItem('token');
        return false; // Token is invalid
    }
    return true;
}

export default tokenChecker;