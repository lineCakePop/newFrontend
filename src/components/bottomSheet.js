import React, { useEffect } from "react";

import { ReactComponent as Cross } from "../icons/Cross.svg";
import ButtonCustom from "./button";

const BottomSheet = ({
  productName,
  variantText,
  productPicture,
  productPrice,
  setDisplayBottomSheet,
  handleSharing,
  handleIndividual,
}) => {
  useEffect(() => {
    // Disable scrolling when the modal is displayed
    document.body.style.overflow = "hidden";

    // Cleanup function to enable scrolling when the modal is closed or unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <>
      <div
        style={{ backgroundColor: "rgba(17, 17, 17, 0.5)" }}
        className="top-0 justify-center items-end flex  w-[100%] absolute h-[100dvh] z-10"
      >
        <div className="bg-[#FFFFFF] rounded-t-[20px] px-[24px]  w-[100%]">
          {/* header */}
          <div className="py-[16px]">
            <div
              className="flex justify-end"
              onClick={() => {
                setDisplayBottomSheet(false);
              }}
            >
              <Cross />
            </div>

            {/* title */}
            <div className="text-[16px] font-bold text-center leading-[20.8px] text-[#111111]">
              Send gift
            </div>
          </div>

          {/* body */}
          <div>
            {/* img */}
            <div className=" flex justify-center items-center py-[32px]">
              <img
                src={productPicture}
                alt="productPicture"
                className="h-[279px] w-[279px] rounded-[8px]"
              />
            </div>

            <div className="flex justify-between">
              <div className="font-semibold text-[14px] leading-[18.2px] w-[281px] truncate h-[18.2px] ">
                {productName}
              </div>
              <div className="text-[12px] font-semibold  leading-[15.6px]">
                ฿{productPrice.toLocaleString("en-US")}
              </div>
            </div>

            {variantText && (
              <div className="leading-[18.2px] h-[18.2px] font-normal text-[#555555] text-[14px] mt-[4px]">
                {variantText}
              </div>
            )}
          </div>
          {/* footer */}
          <div className="mt-[16px] py-[24px]">
            <div className="text-[16px] font-bold leading-[20.8px] text-[#111111]">
              Select option
            </div>

            <div className="mt-[24px] flex flex-col gap-[12px]">
              <ButtonCustom
                title="Create Sharing Party"
                onClick={handleSharing}
              />
              <ButtonCustom
                title="Buy Individually"
                type="outline"
                onClick={handleIndividual}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
