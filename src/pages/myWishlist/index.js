import React, { useState } from "react";

import { ReactComponent as Birthday } from "../../icons/wishlistDetail/birthDayCake.svg";
import { ReactComponent as Gift } from "../../icons/wishlistDetail/gift.svg";

const MyWishlist = () => {
  const [userWishlist, setUserWishlist] = useState();

  const dateFormat = () => {
    if (userWishlist.birthday !== "") {
      const date = new Date(userWishlist.birthday)
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
        })
        .split(" ");

      return (date[1][0] === "0" ? date[1][1] : date[1]) + " " + date[0];
    }
    return "";
  };

  const daysToDate = () => {
    let today = new Date(Date.now());
    let todayMidNight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    let userBD = new Date(userWishlist.birthday);
    let userBDMidNight = new Date(
      today.getFullYear(),
      userBD.getMonth(),
      userBD.getDate()
    );
    userBDMidNight =
      userBDMidNight < todayMidNight
        ? new Date(today.getFullYear() + 1, userBD.getMonth(), userBD.getDate())
        : userBDMidNight;
    // console.log(userBDMidNight);
    const dayDiff = Math.floor(
      (userBDMidNight - todayMidNight) / (1000 * 60 * 60 * 24)
    );
    return dayDiff;
  };

  return (
    <div>
      {" "}
      <div className="h-[128px] px-[24px] py-[16px] border-b border-[#DFDFDF]">
        {/* profile pic and name */}
        <div className="flex items-center">
          <div className="h-[32px] w-[32px] flex justify-center items-center overflow-hidden rounded-full mr-[10px]">
            <img src={userWishlist.pictureUrl} />
          </div>
          <span className="text-[18px] font-bold">
            {userWishlist.displayName}
          </span>
          <span className="text-[18px] font-medium">'s Wishlist</span>
        </div>
        {/* birthday &&  total wishlist */}
        <div className="mt-[24px] justify-between h-[40px] flex">
          <div className="flex">
            <Birthday className="mr-[8px]" />
            <div>
              <p className="text-[14px] font-semibold">{dateFormat()}</p>
              <p className="text-[12px] text-[#777777]">
                {daysToDate()} days until birthday
              </p>
            </div>
          </div>
          <div className="flex">
            <Gift className="mr-[8px]" />
            <div>
              <p className="text-[14px] font-semibold">
                {userWishlist.wishlist.length}
              </p>
              <p className="text-[12px] text-[#777777]">Wishlists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;