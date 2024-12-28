// tokenService.js
import {jwtDecode} from 'jwt-decode';

const token = localStorage.getItem('authToken');
if (token) {
  try {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // Extract the ID from the token
    console.log("User ID:", userId);
  } catch (error) {
    console.error("Invalid token:", error);
  }
}

const tokenService = {
    verifyToken(token) {
        try {
            // Decode the token to get its payload
            const decodedToken = jwtDecode(token);
            
            // Check if the token is expired
            const currentTime = Date.now() / 1000; // Time in seconds
            if (decodedToken.exp < currentTime) {
                console.log("Token has expired");
                return false;
            }

            // Token is valid, return the user ID from token.data
            return decodedToken.id;
        } catch (error) {
            const decodedToken = jwtDecode(token);
            console.error("Invalid token:", error+decodedToken.exp);
            return false;
        }
    },

    // Other token-related functions can be added here
};

export default tokenService;
