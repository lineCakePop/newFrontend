import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import liff from "@line/liff"
import "./App.css"

import ItemInformation from "./pages/ItemInformation"
import FriendWishlist from "./pages/friendWishlist"
import WishListDetail from "./pages/wishListDetail"
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
    }

    return (
        <>
            <Routes>
                <Route
                    path="/wishlist-detail/:userId"
                    element={<WishListDetail />}
                />
                <Route path="/add-birthday" element={<AddBirthday />} />
                <Route path="/friend-wishlist" element={<FriendWishlist />} />
                <Route
                    path="/item-information/:productId"
                    element={<ItemInformation />}
                />
                <Route path="*" element={<ItemInformation />} />
            </Routes>
        </>
    )
}

export default App
