import React from "react";
import ProductDetail from "../productDetail";
import UserIconCustom from "../userIcon";

const PartyHeader = ({
  title,
  productPicture,
  productPrice,
  seller,
  sellerPicture,
  variant,
  productName,
  createBy,
  partyDate,
  partyExpireDate,
  receiverId,
  receiverName,
  receiverPicture,
}) => {
  return (
    <div>
      <div className="px-[24px] py-[16px] h-[106px] border-b border-[#DFDFDF]">
        <div className="text-[20px] font-bold">{title}</div>
        <div className="flex mt-[16px] justify-between">
          <div className="text-[16px] font-medium text-[#949494]">
            Create by <span className="text-[#111111]">{createBy}</span>
          </div>
          <div className="text-[12px] h-[34px]">
            <div className="text-[#949494] h-[16px]">date</div>
            <div className="text-[#FF334B] h-[16px]">expire In</div>
          </div>
        </div>
      </div>
      <div className="p-[24px]">
        <div className="flex justify-between mb-[24px]">
          <div className="text-[14px] font-semibold text-[#555555]">
            Gift Recipient:
          </div>
          <div className="flex items-center gap-[8px]">
            <UserIconCustom height={24} width={24} img={receiverPicture} />
            <span className="text-[16px] font-bold">{receiverName}</span>
          </div>
        </div>
        <ProductDetail
          productName={productName}
          productPicture={productPicture}
          seller={seller}
          sellerPicture={sellerPicture}
          variant={variant}
          productPrice={productPrice}
        />
      </div>
    </div>
  );
};

export default PartyHeader;