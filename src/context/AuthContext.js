import { createContext, useState } from "react"
import { LOADING } from "../utils/const"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [idToken, setIdToken] = useState("")
    const [alreadyFriend,setAlreadyFriend] = useState(LOADING)

    return (
        <AuthContext.Provider value={{ idToken, setIdToken ,setAlreadyFriend,alreadyFriend}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
