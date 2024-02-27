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
          type: "flex",
          altText: "This is a Flex Message",
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
                          text: "Join Line Birthday for",
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
                          action: {
                            type: "uri",
                            label: "action",
                            uri: "http://linecorp.com/",
                          },
                        },
                      ],
                      width: "265px",
                      height: "49px",
                      backgroundColor: "#06C755",
                      cornerRadius: "5px",
                      justifyContent: "center",
                      alignItems: "center",
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
