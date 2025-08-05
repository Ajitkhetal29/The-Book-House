import { jwtDecode } from "jwt-decode";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // ← Notice the camelCase method
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};

export default getUserFromToken;
