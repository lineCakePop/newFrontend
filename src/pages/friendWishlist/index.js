import axios from "axios";
import liff from "@line/liff";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

//  ======================= svg =======================
import { ReactComponent as UserAdd } from "../../icons/friendWishlist/user-add.svg";
import { ReactComponent as Search } from "../../icons/friendWishlist/search.svg";

import WishlistCard from "../../components/friendWishlist/wishlistCard";

function FriendWishlist() {
  const { idToken } = useContext(AuthContext);

  const navigate = useNavigate();

  //  ======================= useEffect =======================

  useEffect(() => {
    getFrinedWisList();
  }, []);

  //  ======================= useState =======================

  const [searchInput, setSearchInput] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [displayWishlist, setDisplayWishlist] = useState([]);

  //  ======================= function =======================

  const getFrinedWisList = async () => {
    try {
      const respones = await axios.get(
        `https://immensely-delicate-kingfish.ngrok-free.app/user/friendWishlist`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            id: idToken,
          },
        }
      );
      setWishlist(respones.data);
      setDisplayWishlist(respones.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (text) => {
    setSearchInput(text);
    setDisplayWishlist(
      wishlist.filter((friendWislist) =>
        friendWislist.displayName
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase())
      )
    );
  };

  const handleShareTarget = () => {
    liff.shareTargetPicker(
      [
        {
          type: "text",
          text: "Hello, World!",
        },
      ],
      {
        isMultiple: true,
      }
    );
  };

  const onClickViewMore = (id) => {
    navigate(`/wishlist-detail/${id}`);
  };

  return (
    <div>
      {/* header */}
      <div className="h-[56px] px-[24px] py-[16px] items-center border-b border-[#DFDFDF] flex justify-between">
        <span className="text-[20px] font-bold">Friend’s wishlist</span>
        <UserAdd onClick={handleShareTarget} />
      </div>
      {/* search */}
      <div className="h-[72px] px-[24px] py-[16px] justify-center items-center relative">
        <input
          className="bg-[#F5F5F5] h-[40px] w-[100%] rounded-[5px] px-[12px] outline-none placeholder-[#B7B7B7]"
          placeholder="      Search friend"
          value={searchInput}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {searchInput === "" && (
          <Search className="absolute top-[28px] left-[35px]" />
        )}
      </div>
      {/* friend wishlist */}
      {displayWishlist.map((friendWislist) => {
        return (
          <WishlistCard
            displayName={friendWislist.displayName}
            pictureUrl={friendWislist.pictureUrl}
            wishlist={friendWislist.wishlist}
            birthDay={friendWislist.birthDay}
            onClickViewMore={() => {
              onClickViewMore(friendWislist._id);
            }}
          />
        );
      })}
    </div>
  );
}

export default FriendWishlist;
