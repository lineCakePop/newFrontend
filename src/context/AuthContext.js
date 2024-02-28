import { createContext, useState } from "react"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [idToken, setIdToken] = useState("")

    return (
        <AuthContext.Provider value={{ idToken, setIdToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
