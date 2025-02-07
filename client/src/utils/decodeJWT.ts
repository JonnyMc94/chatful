import {jwtDecode} from 'jwt-decode'

export const decodeJWT = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken: { userId: number } = jwtDecode(token);
        return decodedToken;
    } else {
        console.log("Token not found")
    }
    
}


