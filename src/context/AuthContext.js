import React, { createContext, useReducer, useEffect, useRef } from "react";
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const mapRef = useRef();

    useEffect(()=> {
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    }, [state.currentUser])


        return (
            <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch, mapRef }} >
                {children}
            </AuthContext.Provider>
        )
    
}