import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

//  ======================= svg =======================

import { ReactComponent as Search } from "../../icons/friendWishlist/search.svg";

import WishlistCard from "../../components/friendWishlist/wishlistCard";

import { LOADING, SUCCESS } from "../../utils/const";

import loadingGif from "../../icons/cakeGif.gif";

function FriendWishlist() {
  const { idToken } = useContext(AuthContext);

  const navigate = useNavigate();

  //  ======================= useEffect =======================

  useEffect(() => {
    if (idToken !== "") {
      getFriendWisList();
    }
  }, [idToken]);

  //  ======================= useState =======================

  const [searchInput, setSearchInput] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [displayWishlist, setDisplayWishlist] = useState([]);
  const [status, setStatus] = useState(LOADING);

  //  ======================= function =======================

  const getFriendWisList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/friendWishlist`,
        {
          params: {
            id: idToken,
          },
        },
      );
      setWishlist(response.data);
      setDisplayWishlist(response.data);
      setStatus(SUCCESS);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (text) => {
    setSearchInput(text);
    setDisplayWishlist(
      wishlist.filter((friendWishlist) =>
        friendWishlist.displayName
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase()),
      ),
    );
  };

  const onClickViewMore = (id) => {
    navigate(`/wishlist-detail/${id}`);
  };

  if (status === LOADING)
    return (
      <div className="grow flex justify-center items-center">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return (
    <div>
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
      {displayWishlist.map((friendWishlist) => {
        return (
          <WishlistCard
            displayName={friendWishlist.displayName}
            pictureUrl={friendWishlist.pictureUrl}
            wishlist={friendWishlist.wishlist}
            birthday={friendWishlist.birthday}
            onClickViewMore={() => {
              onClickViewMore(friendWishlist._id);
            }}
          />
        );
      })}
    </div>
  );
}

export default FriendWishlist;
