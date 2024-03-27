import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// ======================= svgg =======================

import { ReactComponent as Birthday } from "../../icons/wishlistDetail/birthDayCake.svg";
import { ReactComponent as Gift } from "../../icons/wishlistDetail/gift.svg";

// ======================= component =======================

import WishlistCard from "../../components/wishlistDetail/wishlistCard";

import { LOADING, SUCCESS } from "../../utils/const";

import loadingGif from "../../icons/cakeGif.gif";
import BottomSheet from "../../components/bottomSheet";
import EmptyBlockCustom from "../../components/emptyBlock";

import liff from "@line/liff";

const WishlistDetail = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

  // ======================= useState =======================

  const [userWishlist, setUserWishlist] = useState({
    displayName: "",
    pictureUrl: "",
    birthday: "",
    wishlist: [],
  });
  const [status, setStatus] = useState(LOADING);

  // ======================= useEffect =======================

  useEffect(() => {
    getWishlist();
  }, []);

  // ======================= function =======================

  const getWishlist = async () => {
    try {
      // const testId = "65d36f14881470fd62b5c05a";

      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/wishlistOfOneFriend`,
        {
          params: {
            id: userId,
            // id: testId,
          },
        },
      );
      console.log("response.data", response.data);
      setUserWishlist(response.data);
      setStatus(SUCCESS);
    } catch (err) {
      console.log(err);
    }
  };

  const dateFormat = () => {
    if (userWishlist.birthday) {
      const date = new Date(userWishlist.birthday)
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
        })
        .split(" ");

      return (date[1][0] === "0" ? date[1][1] : date[1]) + " " + date[0];
    }
    return "No adding";
  };

  const daysToDate = () => {
    let today = new Date(Date.now());
    let todayMidNight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let userBD = new Date(userWishlist.birthday);
    let userBDMidNight = new Date(
      today.getFullYear(),
      userBD.getMonth(),
      userBD.getDate(),
    );
    userBDMidNight =
      userBDMidNight < todayMidNight
        ? new Date(today.getFullYear() + 1, userBD.getMonth(), userBD.getDate())
        : userBDMidNight;
    // console.log(userBDMidNight);
    const dayDiff = Math.floor(
      (userBDMidNight - todayMidNight) / (1000 * 60 * 60 * 24),
    );
    return dayDiff;
  };

  const [targetWishlist, setTargetWishlist] = useState();
  const [displayBottomSheet, setDisplayBottomSheet] = useState(false);

  const onClickSendGift = (wishlist) => {
    console.log(wishlist);
    setTargetWishlist(wishlist);
    setDisplayBottomSheet(true);
  };

  const handleSharing = () => {
    navigate(`/create-party`, { state: { targetWishlist, userWishlist } });
  };

  const handleIndividual = () => {
    window.location.href(targetWishlist.linkToProduct);
  };

  return (
    <div className="h-[100dvh] overflow-y-scroll flex flex-col">
      {status === LOADING ? (
        <div className="h-[100dvh] flex justify-center items-center ">
          <img src={loadingGif} alt="loading" />
        </div>
      ) : (
        <>
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
                  <p
                    className={`text-[14px] font-semibold ${!userWishlist.birthday ? `text-[#777777]` : `text-[#2A2A2A]`}`}
                  >
                    {dateFormat()}
                  </p>
                  <p className="text-[12px] text-[#777777]">
                    {userWishlist.birthday
                      ? `
                    ${daysToDate()} days until birthday`
                      : `Birthday`}
                  </p>
                </div>
              </div>
              <div className="flex">
                <Gift className="mr-[8px]" />
                <div>
                  <p
                    className={`text-[14px] font-semibold text-[#777777] ${userWishlist.wishlist.length === 0 ? `text-[#777777]` : `text-[#2A2A2A]`}`}
                  >
                    {userWishlist.wishlist.length}
                  </p>
                  <p className="text-[12px] text-[#777777]">Wishlists</p>
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          {userWishlist.wishlist.length === 0 ? (
            <EmptyBlockCustom
              title="Your friend has no wishlist"
              showSubTitle={false}
            />
          ) : (
            <div className="mt-[36px] flex-col flex gap-[32px] items-center">
              {userWishlist.wishlist.map((wishlist) => (
                <WishlistCard
                  key={wishlist.productName}
                  productName={wishlist.productName}
                  productPicture={wishlist.productPicture}
                  productPrice={wishlist.productPrice}
                  variantText={wishlist.variantText}
                  discountPrice={wishlist.discountPrice}
                  haveDiscount={wishlist.haveDiscount}
                  onClickSendGift={onClickSendGift}
                  wishlist={wishlist}
                />
              ))}
            </div>
          )}

          {displayBottomSheet && (
            <BottomSheet
              productName={targetWishlist.productName}
              productPicture={targetWishlist.productPicture}
              productPrice={targetWishlist.productPrice}
              variantText={targetWishlist.variantText}
              setDisplayBottomSheet={setDisplayBottomSheet}
              handleSharing={handleSharing}
              handleIndividual={handleIndividual}
              discountPrice={targetWishlist.discountPrice}
              haveDiscount={targetWishlist.haveDiscount}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WishlistDetail;
