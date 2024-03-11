import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { ReactComponent as Calendar } from "../icons/navbar/calendar.svg";
import { ReactComponent as Friends } from "../icons/navbar/friends.svg";
import { ReactComponent as Gifts } from "../icons/navbar/gifts-solid.svg";
import { ReactComponent as Heart } from "../icons/navbar/heart.svg";
import { ReactComponent as Settings } from "../icons/navbar/settings.svg";
import { ReactComponent as UserInvite } from "../icons/navbar/_/icon before.svg";

import axios from "axios";
import liff from "@line/liff";

const Navbar = () => {
  const { idToken } = useContext(AuthContext);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const navbarItem = [
    { img: <Calendar />, name: "Calendar", path: "" },
    { img: <Friends />, name: "Friends", path: "/friend-wishlist" },
    { img: <Gifts />, name: "Party", path: "" },
    { img: <Heart />, name: "My wishlist", path: "/my-wishlist" },
    { img: <Settings />, name: "Setting", path: "" },
  ];

  const handleClickNavbar = (path) => {
    navigate(path);
  };

  const handleShareTarget = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/inviteLink`,
        { params: { id: idToken } }
      );
      console.log();

      liff.shareTargetPicker(
        [
          {
            type: "flex",
            altText: "Line birthday invite",
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
        }
      );
    } catch (err) {}
  };

  if (!navbarItem.some((item) => item.path === pathname)) {
    return <></>;
  }

  return (
    <>
      <style>
        {`
          .active-icon path {
            fill: black;
          }
          `}
      </style>
      <div className="h-[132px] px-[24px] py-[8px]">
        <div
          className="h-[36px] w-[117px] rounded-[5px] border border-[#EFEFEF] flex justify-center items-center"
          onClick={handleShareTarget}
        >
          <UserInvite />
          <span className="ml-[4px] text-[14px] font-medium">
            Invite friend
          </span>
        </div>
        <div className="flex justify-center">
          {navbarItem.map((item) => (
            <div
              onClick={() => {
                handleClickNavbar(item.path);
              }}
              className={`w-[64px] h-[60px] flex flex-col items-center  pt-[14px] ${
                item.path === pathname ? "border-[#06C755] border-b-[2px]" : ""
              }`}
            >
              <div className={`${item.path === pathname ? "active-icon" : ""}`}>
                {item.img}
              </div>
              <span
                className={`text-[10px] ${
                  item.path === pathname ? "" : "text-[#B7B7B7]"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
