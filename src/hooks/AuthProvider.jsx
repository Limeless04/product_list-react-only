import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const LoginUser = async (credentials) => {
        try{
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          })
          if(!res.ok){
            throw new Error(`HTTP error! Status: ${(await res).status}`);
          }
          const result = await res.json()
          if (result) {
            setUser(result.username);
            setToken(result.token);
            localStorage.setItem("token", result.token);
            navigate("/");  
            return;
          }
        }catch(err){
          console.error("Error in LoginUser:", err);
          throw new Error("Failed to log in");
        }
      };
    
      const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
      };


      return (
        <AuthContext.Provider value={{ token, user, LoginUser, logOut }}>
          {children}
        </AuthContext.Provider>
      );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  };

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

// Children.PropTypes = {
//     children: PropTypes.element
// }