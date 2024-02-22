import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowHead } from "../../icons/ItemInformation/Vector.svg";

import Button from "../../components/Button";

import { useParams } from "react-router-dom";

import axios from "axios";

const product = {
  productName: "Bonjour Tote Bag",
  productPicture:
    "https://static.wixstatic.com/media/2349a0_c9b86d38c80d4353853d5681593cd88a~mv2.jpg/v1/fill/w_480,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2349a0_c9b86d38c80d4353853d5681593cd88a~mv2.jpg",
  productPrice: 1400,
  seller: "anytoty shop",
  sellerPicture: "https://cdn01.pinkoi.com/product/Ku8E3KRW/0/1/640x530.jpg",
  link_to_product: "",
  link_to_seller: "",
  variant: {
    color: ["red", "green"],
    variant_name2: ["s", "m"],
  },
};

const ItemInformation = () => {
  const { productId } = useParams();

  useEffect(() => {
    getProductInformation();
  }, []);

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

  const [variantArray, setVariantArray] = useState([]);

  const getProductInformation = async () => {
    try {
      const response = await axios.get(
        "https://immensely-delicate-kingfish.ngrok-free.app/wishlist/productToChooseVariant",
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            id: productId,
          },
        }
      );
      setItemInformation(response.data);
      setVariantArray(
        new Array(Object.keys(response.data.variant).length).fill("")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onClickConfirm = async () => {
    try {
      await axios.put(
        "https://immensely-delicate-kingfish.ngrok-free.app/wishlist/addVariantToWishlist",
        {
          id: productId,
          variantOption1: variantArray[0],
          variantOption2: variantArray[1],
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
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
        {Object.entries(itemInformation.variant).map(([key, value], index) => (
          <div>
            <span className="text-[14px] font-semibold mb-[12px]">{key}</span>
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
        ))}
      </div>
      {/* footer */}
      <div className="cursor-pointer h-[97px] flex justify-center items-center">
        <Button
          title="Confirm"
          onClick={() => {
            onClickConfirm();
          }}
        />
      </div>
    </div>
  );
};

export default ItemInformation;
