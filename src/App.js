import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import liff from "@line/liff"
import "./App.css"
import ItemInformation from "./pages/ItemInformation"
import axios from "axios"
import AddBirthday from "./pages/AddBirthday"

const LiffId = process.env.REACT_APP_LIFF_ID

function App() {
    useEffect(() => {
        // liffCheck();
    }, [])

    // auth
    const liffCheck = async () => {
        // const isInClient = await liff.isInClient();
        await liff.init({
            liffId: LiffId,
            withLoginOnExternalBrowser: true,
        })
        const idToken = await liff.getIDToken()
        console.log(idToken)
        const response = await axios.post(
            "https://api.line.me/oauth2/v2.1/verify",
            { id_token: idToken, client_id: 2003293436 }
        )
        console.log(response)
    }

    return (
        <>
            <Routes>
                <Route path="*" element={<ItemInformation />} />
                <Route path="/AddBirthday" element={<AddBirthday />} />
            </Routes>
        </>
    )
}

export default App
