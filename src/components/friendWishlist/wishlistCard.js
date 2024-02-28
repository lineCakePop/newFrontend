import React from "react";

import { ReactComponent as ArrowHead } from "../../icons/ItemInformation/Vector.svg";

function WishlistCard({
  displayName,
  pictureUrl,
  wishlist,
  birthday,
  onClickViewMore,
}) {
  const dateFormat = (birthday) => {
    if (birthday) {
      const date = new Date(birthday);
      const format = date
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
        })
        .split(" ");

      return format[1] + " " + format[0];
    }
    return "";
  };

  return (
    <div className="h-[185px] border-b border-[#DFDFDF] p-[24px]">
      {/* detail */}
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[39px] h-[39px] rounded-full flex justify-center items-center overflow-hidden">
            <img src={pictureUrl} className="w-[39px]" />
          </div>
          <div className="ml-[10px] flex-col justify-center">
            <div className="text-[14px] font-semibold h-[18.2px]">
              {displayName}
            </div>

            <span className="text-[12px] text-[#555555]">
              {dateFormat(birthday)}
            </span>
          </div>
        </div>
        <div
          className="flex self-start items-center cursor-pointer"
          onClick={onClickViewMore}
        >
          <span className="text-[#06C755] mr-[10px] text-[12px]">
            View more
          </span>
          <ArrowHead />
        </div>
      </div>
      {/* product */}
      <div className="mt-[16px] flex gap-[12px]">
        {wishlist.map((product, index) =>
          index < 4 ? (
            <div className="h-[72px] w-[72px] border-[0.5px] border-[#DFDFDF] overflow-hidden flex justify-center items-center rounded">
              <img src={product.productPicture} className="h-[72px]"></img>
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}

export default WishlistCard;
