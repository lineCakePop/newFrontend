import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

// ========================= componet =========================

import UserIconCustom from "../userIcon";

// ========================= svg =========================

import { ReactComponent as Cross } from "../../icons/Cross.svg";
import { ReactComponent as Search } from "../../icons/friendWishlist/search.svg";

import axios from "axios";

import { LOADING, SUCCESS } from "../../utils/const";

import loadingGif from "../../icons/cakeGif.gif";

const RecipientSelector = ({
  setReceiver,
  defaultReceiver,
  defaultDisplaySelector = false,
}) => {
  const { idToken } = useContext(AuthContext);

  // ========================= useState =========================

  const [displaySelector, setDisplaySelector] = useState(
    defaultDisplaySelector,
  );
  const [currentRecipient, setCurrentRecipient] = useState(defaultReceiver);

  const [searchInput, setSearchInput] = useState("");

  const [friendList, setFriendList] = useState([]);
  const [displayFriendList, setDisplayFriendList] = useState([]);

  const [status, setStatus] = useState(LOADING);

  // ========================= useEffect =========================

  useEffect(() => {
    if (idToken !== "") {
      getUserFriend();
    }
  }, [idToken]);

  // ========================= function =========================

  const handleSearch = (input) => {
    setSearchInput(input);
    setDisplayFriendList(
      friendList.filter((user) =>
        user.displayName.toLowerCase().includes(input.toLowerCase()),
      ),
    );
  };

  const handleSelectFriend = (user) => {
    setCurrentRecipient({
      _id: user._id,
      displayName: user.displayName,
      pictureUrl: user.pictureUrl,
    });
    setReceiver(user);
    setDisplaySelector(false);
  };

  const getUserFriend = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/userFriend`,
        {
          params: {
            id: idToken,
          },
        },
      );
      setFriendList(response.data);
      setDisplayFriendList(response.data);
      setStatus(SUCCESS);
      if (defaultReceiver._id === "" && response.data[0]) {
        setCurrentRecipient({
          _id: response.data[0]._id,
          displayName: response.data[0].displayName,
          pictureUrl: response.data[0].pictureUrl,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {displaySelector && (
        <div className="absolute bg-white left-0 top-0 h-[100dvh] w-[100%] z-[10] flex flex-col">
          {/* header */}
          <div className="h-[56px] bg-white flex justify-between items-center px-[24px]">
            <div />
            <span className="text-[20px] font-bold">Choose recipient</span>
            <Cross
              onClick={() => {
                setDisplaySelector(false);
              }}
            />
          </div>
          {/* search */}
          <div className="h-[72px] px-[24px] bg-white py-[16px] justify-center items-center relative">
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
          <div className="h-[53px] bg-white px-[24px] py-[16px] font-bold">
            Friends
          </div>
          {/* list of friend */}
          {status === LOADING ? (
            <div className="grow flex justify-center items-center">
              <img src={loadingGif} alt="loading" />
            </div>
          ) : (
            <div className="flex flex-col gap-[4px]">
              {displayFriendList.map((user) => (
                <div
                  className="flex px-[24px] items-center bg-white h-[66px] gap-[16px]"
                  onClick={() => {
                    handleSelectFriend(user);
                  }}
                >
                  <UserIconCustom
                    height={50}
                    width={50}
                    img={user.pictureUrl}
                  />
                  <span className="text-[14px] leading-[18.2px] font-semibold">
                    {user.displayName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* ============================== */}
      <div className="rounded border-[1px] border-[#DFDFDF] h-[48px] w-[100%] flex justify-between items-center py-[12px] px-[10px]">
        <div className="flex gap-[8px] h-[24px] items-center">
          <UserIconCustom
            width={24}
            height={24}
            img={currentRecipient.pictureUrl}
          />
          <span className="text-[14px] leading-[18.2px]  font-semibold">
            {currentRecipient.displayName}
          </span>
        </div>
        <span
          className="text-[14px] leading-[18.2px] text-[#06C755] font-semibold"
          onClick={() => {
            setDisplaySelector(true);
          }}
        >
          Change
        </span>
      </div>
    </>
  );
};

export default RecipientSelector;
