import { ReactComponent as Bin } from "../../icons/myWishlist/bin.svg";

const WishlistCard = ({ wishlistInformation, onClickDelete }) => {
  return (
    <div className="w-[327px] h-[64px] flex ">
      {/* img */}
      <div className="w-[64px] h-[64px] flex justify-center items-center overflow-hidden mr-[10px]">
        <img src={wishlistInformation.productPicture} className="w-[64px] " />
      </div>
      {/* detail */}
      <div className="w-[253px]">
        <div className="flex justify-between items-center ">
          <div className="font-semibold text-[14px] leading-[18.2px] w-[180px] truncate h-[18.2px] ">
            {wishlistInformation.productName}
          </div>
          <Bin onClick={onClickDelete} />
        </div>
        <div className="leading-[18.2px] h-[18.2px] font-normal text-[#555555] text-[14px] mt-[4px]">
          {wishlistInformation.variantText}
        </div>
        {wishlistInformation.haveDiscount ? (
          <div className="flex h-[16px] mt-[4px] items-center">
            <div className="text-[10px]  font-semibold line-through mr-[4px]">
              ฿{wishlistInformation.productPrice.toLocaleString("en-US")}
            </div>
            <div className="text-[12px] font-semibold leading-[15.6px] text-[#FF334B]">
              ฿{wishlistInformation.discountPrice.toLocaleString("en-US")}
            </div>
          </div>
        ) : (
          <div className="text-[12px] font-semibold mt-[8px] leading-[15.6px]">
            ฿{wishlistInformation.productPrice.toLocaleString("en-US")}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistCard;
