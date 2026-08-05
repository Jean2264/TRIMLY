//Aca guardos estados 

import { createContext } from "react";
import { useState } from "react";

export const AuthContext= createContext();

function AuthProvider({children})
{
    const [user, setUser]= useState( JSON.parse(localStorage.getItem("user")) || null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const login= (usuario) => {
        setUser(usuario);
        localStorage.setItem("user", JSON.stringify(usuario));
    };


    const logout= () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return(
        <AuthContext.Provider
        value={{
            user,
            login,
            isAuthModalOpen,
            setIsAuthModalOpen,
            logout,
            isUserPanelOpen,
        setIsUserPanelOpen
        }}
>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

