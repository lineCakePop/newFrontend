import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import liff from "@line/liff";

// ======================= svg =======================

import { ReactComponent as ArrowHead } from "../../icons/ItemInformation/Vector.svg";
import { ReactComponent as Correct } from "../../icons/ItemInformation/correctIcon.svg";

// ======================= component =======================

import ButtonCustom from "../../components/button";

import { LOADING, SUCCESS } from "../../utils/const";

import loadingGif from "../../icons/cakeGif.gif";
import ToastCustom from "../../components/toast";

const ItemInformation = () => {
  const { transactionId } = useParams();

  // ======================= useState=======================

  const [itemInformation, setItemInformation] = useState({
    productName: "",
    productPicture: "",
    productPrice: 1400,
    seller: "",
    sellerPicture: "",
    linkToProduct: "",
    linkToSeller: "",
    variant: {},
  });

  const [displayToast, setDisplayToast] = useState(false);

  const [variantArray, setVariantArray] = useState([]);

  const [status, setStatus] = useState(LOADING);

  // ======================= useEffect =======================

  useEffect(() => {
    getProductInformation();
  }, []);

  //   after complete add variation close liff
  useEffect(() => {
    if (displayToast) {
      setTimeout(() => {
        liff.closeWindow();
      }, 1500);
    }
  }, [displayToast]);

  // ======================= function =======================

  const getProductInformation = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/wishlist/productToChooseVariant`,
        {
          params: {
            id: transactionId,
          },
        }
      );
      setItemInformation(response.data);
      setVariantArray(
        new Array(Object.keys(response.data.variant).length).fill("")
      );
      setStatus(SUCCESS);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickConfirm = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_PROXY}/wishlist/addVariantToWishlist`,
        {
          id: transactionId,
          variantOption1: variantArray[0],
          variantOption2: variantArray[1],
        }
      );
      setDisplayToast(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (status === LOADING)
    return (
      <div className="h-[100dvh] flex justify-center items-center">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return (
    <>
      {displayToast && (
        <ToastCustom tittle={<span>Variation added</span>} icon={<Correct />} />
      )}
      <div className="h-[100dvh] overflow-y-scroll">
        {/* header */}
        <div className="h-[56px] bg-white flex justify-between px-[24px] items-center">
          <p className="font-bold text-[20px]">Add item Variation</p>
        </div>
        {/* product img */}
        <div className="h-[375px] flex justify-center items-center overflow-hidden">
          <img
            src={itemInformation.productPicture}
            alt="product_img"
            className="h-[375px]"
          />
        </div>
        {/* product name */}
        <div className="px-[24px] pt-[24px]  ">
          <div className=" border-b pb-[16px]">
            <p className="font-medium text-[16px] leading-[20.8px]">
              {itemInformation.productName}
            </p>
            <p className="font-bold text-[18px] mt-[8px] ">
              ฿{itemInformation.productPrice.toLocaleString("en-US")}
            </p>
          </div>
        </div>
        {/* seller */}
        <div className="h-[88px] p-[24px] flex justify-between">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden flex justify-center items-center">
            <img
              className="h-[40px]"
              src={itemInformation.sellerPicture}
              alt="seller_picture"
            />
          </div>
          <div className="flex items-center w-[279px] justify-between">
            <span className="font-semibold text-[14px]">
              {itemInformation.seller}
            </span>
            <div
              onClick={() => {
                window.location.replace(itemInformation.linkToSeller);
              }}
              className="flex w-[81px] justify-between items-center"
            >
              <span className="text-[12px] text-[#06C755]">Go to shop</span>
              <ArrowHead />
            </div>
          </div>
        </div>
        <div className="h-[8px] bg-[#DFDFDF]" />
        <div className="px-[24px] pt-[24px] pb-[8px] flex-col gap-[16px]">
          {Object.entries(itemInformation.variant).map(
            ([key, value], index) => (
              <div>
                <span className="text-[14px] font-semibold mb-[12px]">
                  {key}
                </span>
                <div className="flex gap-[8px] mt-[12px] flex-wrap mb-[16px]">
                  {value.map((item) => (
                    <div
                      className={`${
                        variantArray[index] === item ? "text-[#06C755]" : ""
                      } px-[12px] py-[8px] flex justify-center items-center rounded border border-[#DFDFDF] text-[10px] h-[26px] font-semibold`}
                      onClick={() => {
                        const updateArray = [...variantArray];
                        updateArray[index] = item;

                        setVariantArray(updateArray);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
        {/* footer */}
        <div className="cursor-pointer h-[97px] flex justify-center items-center">
          <ButtonCustom
            title="Confirm"
            onClick={() => {
              onClickConfirm();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ItemInformation;
