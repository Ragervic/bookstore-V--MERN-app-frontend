import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}



// AuthProvider

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // Register user function
    const registerUser = async (email,password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // Login user/
    const userLogin = async (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }
    
    // Sign-in with google
    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = async () => {
        return await signInWithPopup(auth,googleProvider)
    }

    // sign-out 
    const logOut = () => {
        return signOut(auth)
    }

    // Manage user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, displayName, photoURL } = user
                const userData = {email,username: displayName, photo: photoURL}
                setCurrentUser(userData)
            }else {
                setCurrentUser(null)
            }
            setLoading(false)})
        return () => unSubscribe()
        
    },[])


    const value = {
        currentUser,
        loading,
        registerUser,
        userLogin,
        signInWithGoogle,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
