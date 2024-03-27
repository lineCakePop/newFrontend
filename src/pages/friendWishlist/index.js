import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

//  ======================= svg =======================

import { ReactComponent as Search } from "../../icons/friendWishlist/search.svg";
import { ReactComponent as EmptyBlock } from "../../icons/emptyBlock.svg";

import WishlistCard from "../../components/friendWishlist/wishlistCard";

import { LOADING, SUCCESS } from "../../utils/const";

import loadingGif from "../../icons/cakeGif.gif";

import liff from "@line/liff";

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
            // id: "eyJraWQiOiIwZjdhYzBmOGEyMmUxMzFiNWZlNzVhOWNlMTY5OWFjYTE1MGY3ZjZjMGVkNzVlMjgyYjNiZjdmYjA5N2E3NjNlIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVWRjMGIwMzAzMzY1ZDZhMTVlYjI2NWRiZjVjZTcyNzNlIiwiYXVkIjoiMjAwMzYxOTE2NSIsImV4cCI6MTcxMTI2NTEwOSwiaWF0IjoxNzExMjYxNTA5LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4LmE4Lih4LmJ4LmB4LiB4LmI4LiZIiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoQW4tUVBfQUZIa0VRS0EyclBnRmhGaXh0RUN4bkJoZ0phRWNGSWpaOEZYWnVTMTFEZmtoVGMyRjRTU1ZvU3d4SEx4MVNJekVwRW5JLSJ9.CwjB4rz8maeuS8MtXvyNAwwdi8lBW4I0YGAZCM5HUFc-7iyULjlmMsqE5lfupfJL1aCAhgwnxkv8cox5MQERpQ",
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

  const handleShareTarget = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/inviteLink`,
        { params: { id: idToken } },
      );
      console.log();

      liff.shareTargetPicker(
        [
          {
            type: "flex",
            altText: "LINE birthday invite",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "Let’s become friend!",
                        weight: "regular",
                        color: "#06C755",
                        size: "14px",
                      },
                    ],
                    paddingStart: "20px",
                    paddingTop: "20px",
                    paddingEnd: "20px",
                    paddingBottom: "16px",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "image",
                            url: "https://firebasestorage.googleapis.com/v0/b/cakepop-be50a.appspot.com/o/Image%20Area.png?alt=media&token=37e30d34-af80-4bbd-b863-4078bb845abe",
                            aspectMode: "cover",
                            size: "64px",
                          },
                        ],
                        height: "42px",
                        width: "42px",
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "Join LINE Birthday for",
                            size: "16px",
                            maxLines: 3,
                            color: "#111111",
                            weight: "bold",
                          },
                          {
                            type: "text",
                            text: "memorable experience",
                            size: "16px",
                            maxLines: 3,
                            weight: "bold",
                            color: "#111111",
                          },
                        ],
                        margin: "12px",
                      },
                    ],
                    height: "42px",
                    paddingStart: "20px",
                    paddingEnd: "20px",
                  },
                  {
                    type: "separator",
                    margin: "20px",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "Accept Invite",
                            size: "16px",
                            color: "#FFFFFF",
                            weight: "bold",
                          },
                        ],
                        width: "265px",
                        height: "49px",
                        backgroundColor: "#06C755",
                        cornerRadius: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        action: {
                          type: "uri",
                          label: "action",
                          uri: `https://liff.line.me/2003619165-JRmR1GYd/invite-friend/${response.data.inviteId}`,
                        },
                      },
                    ],
                    paddingAll: "20px",
                  },
                ],
                margin: "0px",
                paddingAll: "0px",
              },
              styles: {
                footer: {
                  separator: true,
                },
              },
            },
          },
        ],
        {
          isMultiple: true,
        },
      );
    } catch (err) {}
  };

  if (status === LOADING)
    return (
      <div className="grow flex justify-center items-center">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return (
    <div className="grow">
      {wishlist.length === 0 ? (
        <div className="h-[100%] flex flex-col justify-center items-center">
          <EmptyBlock />
          <p className="mt-[8px] font-bold text-[#949494] text-[18px]">
            Your friends list is empty
          </p>
          <p className="text-[#949494] text-[14px]">Invite friends to join</p>
          <div
            className="h-[36px] mt-[18px] flex justify-center items-center w-[95px] rounded-[5px] text-[14px] font-medium border-[#EFEFEF] border"
            onClick={handleShareTarget}
          >
            Invite friend
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default FriendWishlist;
