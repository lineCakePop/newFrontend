import React from "react";

import { ReactComponent as Gift } from "../../icons/wishlistDetail/greenGift.svg";

const WishlistCard = ({
  productName,
  variantText,
  productPicture,
  productPrice,
  onClickSendGift,
  wishlist,
  haveDiscount,
  discountPrice,
  linkToProduct,
}) => {
  const handleLinkToProduct = () => {
    window.location.href = linkToProduct;
  };
  return (
    <div className="w-[328px] h-[108px] flex gap-[10px]">
      {/* img */}
      <div
        className="h-[108px] w-[106px] flex justify-center items-center overflow-hidden rounded"
        onClick={handleLinkToProduct}
      >
        <img src={productPicture} alt="product" className="w-[106px]" />
      </div>
      {/* detail */}
      <div>
        <div
          className="font-semibold text-[14px] leading-[18.2px] w-[180px] truncate h-[18.2px] "
          onClick={handleLinkToProduct}
        >
          {productName}
        </div>
        <div className="leading-[18.2px] h-[18.2px]  font-normal text-[#555555] text-[14px] mt-[4px]">
          {variantText}
        </div>
        {haveDiscount ? (
          <div className="flex h-[16px] mt-[4px] items-center">
            <div className="text-[10px]  font-semibold line-through mr-[4px]">
              ฿{productPrice.toLocaleString("en-US")}
            </div>
            <div className="text-[12px] font-semibold leading-[15.6px] text-[#FF334B]">
              ฿{discountPrice.toLocaleString("en-US")}
            </div>
          </div>
        ) : (
          <div className="text-[12px] font-semibold mt-[4px] leading-[15.6px]">
            ฿{productPrice.toLocaleString("en-US")}
          </div>
        )}
        {/* button */}
        <div
          className="h-[40px] mt-[8px] w-[211px] border rounded border-[#DFDFDF] flex justify-center items-center"
          onClick={() => {
            onClickSendGift(wishlist);
          }}
        >
          <Gift />
          <span className="text-[10px] font-semibold ml-[7px]">Send Gift</span>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
