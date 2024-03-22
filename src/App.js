import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import liff from "@line/liff";
import "./App.css";

import ItemInformation from "./pages/ItemInformation";
import FriendWishlist from "./pages/friendWishlist";
import WishlistDetail from "./pages/wishlistDetail";
import AddBirthday from "./pages/addBirthday";
import Loading from "./pages/Loading";
import InviteFriend from "./pages/inviteFriend";

import { AuthContext } from "./context/AuthContext";
import MyWishlist from "./pages/myWishlist";
import Calendar from "./pages/calendar";
import FriendCheck from "./components/friendCheck";
import CreatePartySelectItem from "./pages/createPartySelectItem";
import Navbar from "./components/navbar";
import CreateParty from "./pages/createParty";
import Setting from "./pages/setting";
import JoinParty from "./pages/joinParty";
import BillSharingParty from "./pages/billSharingParty";

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
        <div className="h-[100dvh] flex flex-col">
          <Navbar />
          <Routes>
            <Route
              path="/wishlist-detail/:userId"
              element={<WishlistDetail />}
            />
            <Route path="/add-birthday" element={<AddBirthday />} />
            <Route path="/friend-wishlist" element={<FriendWishlist />} />
            <Route
              path="/item-information/:transactionId"
              element={<ItemInformation />}
            />
            <Route
              path="invite-friend/:inviteCode"
              element={<InviteFriend />}
            />
            <Route path="/my-wishlist" element={<MyWishlist />} />
            <Route
              path="create-party-select-item"
              element={<CreatePartySelectItem />}
            />
            <Route path="create-party" element={<CreateParty />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="setting" element={<Setting />} />
            <Route path="join-party/:partyId" element={<JoinParty />} />
            <Route
              path="bill-sharing-party/:partyId"
              element={<BillSharingParty />}
            />
            <Route path="*" element={<Loading />} />
          </Routes>
        </div>
      </FriendCheck>
    </>
  );
}

export default App;
