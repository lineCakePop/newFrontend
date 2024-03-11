import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import liff from "@line/liff";
import "./App.css";

import ItemInformation from "./pages/ItemInformation";
import FriendWishlist from "./pages/friendWishlist";
import WishListDetail from "./pages/wishListDetail";
import AddBirthday from "./pages/addBirthday";
import Loading from "./pages/Loading";
import InviteFriend from "./pages/inviteFriend";

import { AuthContext } from "./context/AuthContext";
import MyWishlist from "./pages/myWishlist";
import FriendCheck from "./components/friendCheck";
import CreatePartySelectItem from "./pages/createPartySelectItem";

const LiffId = process.env.REACT_APP_LIFF_ID;

function App() {
  const { setIdToken } = useContext(AuthContext);
  useEffect(() => {
    liffCheck();
  }, []);

  // auth
  const liffCheck = async () => {
    await liff.init({
      liffId: LiffId,
      withLoginOnExternalBrowser: true,
    });
    const idTokenResponse = await liff.getIDToken();
    setIdToken(idTokenResponse);
    console.log(idTokenResponse);
  };

  return (
    <>
      <FriendCheck>
        <Routes>
          <Route path="/wishlist-detail/:userId" element={<WishListDetail />} />
          <Route path="/add-birthday" element={<AddBirthday />} />
          <Route path="/friend-wishlist" element={<FriendWishlist />} />
          <Route
            path="/item-information/:transactionId"
            element={<ItemInformation />}
          />
          <Route path="invite-friend/:inviteCode" element={<InviteFriend />} />
          <Route path="my-wishlist" element={<MyWishlist />} />
          <Route
            path="create-party-select-item"
            element={<CreatePartySelectItem />}
          />
          <Route path="*" element={<Loading />} />
        </Routes>
      </FriendCheck>
    </>
  );
}

export default App;
