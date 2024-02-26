import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import liff from "@line/liff";
import "./App.css";

import ItemInformation from "./pages/ItemInformation";
import FriendWishlist from "./pages/friendWishlist";
import WishListDetail from "./pages/wishListDetail";
import AddBirthday from "./pages/AddBirthday";
import Loading from "./pages/Loading";
import { AuthContext } from "./context/AuthContext";

const LiffId = process.env.REACT_APP_LIFF_ID;

function App() {
  const { setIdToken } = useContext(AuthContext);
  useEffect(() => {
    liffCheck();
  }, []);

  // auth
  const liffCheck = async () => {
    // const isInClient = await liff.isInClient();
    await liff.init({
      liffId: LiffId,
      withLoginOnExternalBrowser: true,
    });
    const idTokenResponse = await liff.getIDToken();
    setIdToken(idTokenResponse);
    // console.log(idTokenResponse);
  };

  return (
    <>
      <Routes>
        <Route path="/wishlist-detail/:userId" element={<WishListDetail />} />
        <Route path="/add-birthday" element={<AddBirthday />} />
        <Route path="/friend-wishlist" element={<FriendWishlist />} />
        <Route
          path="/item-information/:productId"
          element={<ItemInformation />}
        />
        <Route path="*" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;
