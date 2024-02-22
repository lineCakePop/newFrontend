import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ReactComponent as Birthday } from "../../icons/wishlistDetail/birthDayCake.svg";
import { ReactComponent as Gift } from "../../icons/wishlistDetail/gift.svg";

import axios from "axios";

const WishListDetail = () => {
  const { userId } = useParams();

  const [userWishlist, setUserWishlist] = useState({
    displayName: "",
    pictureUrl: "",
    birthday: "",
    wishlist: [],
  });

  useEffect(() => {
    getWisList();
  }, []);

  const getWisList = async () => {
    try {
      const respones = await axios.get(
        `https://immensely-delicate-kingfish.ngrok-free.app/user/wishlistOfOneFriend`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            id: userId,
          },
        }
      );
      setUserWishlist(respones.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    const currentDate = new Date();
    const birthday = new Date(userWishlist.birthday);

    const differenceMs = Math.abs(currentDate - birthday);

    // Convert milliseconds to days
    const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    console.log(daysDifference % 365);
  };

  console.log(daysToDate());

  return (
    <div className="">
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
        {/* birthday total wishlist */}
        <div className="mt-[24px] justify-between h-[40px] flex">
          <div className="flex">
            <Birthday className="mr-[8px]" />
            <div>
              <p className="text-[14px] font-semibold">{dateFormat()}</p>
              <p className="text-[12px] text-[#777777]">
                284 days until birthday
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

export default WishListDetail;
