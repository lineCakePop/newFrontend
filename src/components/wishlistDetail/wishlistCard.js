import React from "react";

import { ReactComponent as Gift } from "../../icons/wishlistDetail/greenGift.svg";

const WishlistCard = ({
  productName,
  variantText,
  productPicture,
  productPrice,
}) => {
  const price = 1300;
  return (
    <div className="w-[328px] h-[108px] flex gap-[10px]">
      {/* img */}
      <div className="h-[108px] w-[106px] flex justify-center items-center overflow-hidden rounded">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg"
          }
          alt="product picture"
          className="h-[108px]"
        />
      </div>
      {/* detail */}
      <div>
        <div className="font-semibold text-[14px] leading-[18.2px]">
          Bonjour Tote Bag
        </div>
        <div className="leading-[18.2px] font-normal text-[#555555] text-[14px] mt-[4px]">
          white
        </div>
        <div className="text-[12px] font-semibold mt-[4px] leading-[15.6px]">
          ฿{price.toLocaleString("en-US")}
        </div>
        {/* button */}
        <div className="h-[40px] mt-[8px] w-[211px] border rounded border-[#DFDFDF] flex justify-center items-center">
          <Gift />
          <span className="text-[10px] font-semibold ml-[7px]">Send Gift</span>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
