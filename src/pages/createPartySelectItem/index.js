import { useState } from "react";
import RecipientSelector from "../../components/createParty/recipientSelector";
import ButtonCustom from "../../components/button";

import { ReactComponent as LinkIcon } from "../../icons/createParty/link-solid.svg";
import axios from "axios";
import UserIconCustom from "../../components/userIcon";
import ProductImgCustom from "../../components/productImg";

const CreatePartySelectItem = () => {
  const [receiverId, setReceiverId] = useState("");
  const [addButtonDisable, setAddButtonDisable] = useState(false);
  const [lineShoppingUrl, setLineShoppingUrl] = useState("");
  const [productDetail, setProductDetail] = useState({
    productName: "",
    haveVariant: false,
    productPicture: "",
    productPrice: "",
    seller: "",
    sellerPicture: "",
    variant: [],
  });
  const [variantArray, setVariantArray] = useState([]);
  // https://shop.line.me/@junenycandy/product/1002705377?utm_source=Seller_feature&utm_medium=Storefront-Productend&utm_keyword=811cf8ca09d65653504816fe50268ed21710753383316
  const getProductFromLink = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/party/getProductFromLink`,
        { url: lineShoppingUrl },
      );
      setProductDetail({
        productName: response.data.productName,
        haveVariant: response.data.haveVariant,
        productPicture: response.data.productPicture,
        productPrice: response.data.productPrice,
        seller: response.data.seller,
        sellerPicture: response.data.sellerPicture,
        variant: Object.entries(response.data.variant).map(([key, value]) => ({
          name: key,
          value: value,
        })),
      });
      setVariantArray(
        new Array(Object.keys(response.data.variant).length).fill(""),
      );
      setAddButtonDisable(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDisableNextButton = () => {
    if (productDetail.productName !== "" && !productDetail.haveVariant) {
      return false;
    } else if (
      productDetail.productName !== "" &&
      productDetail.haveVariant &&
      variantArray.every((item) => item !== "")
    ) {
      return false;
    }

    return true;
  };

  const onClickNext = () => {};

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* content */}
      <div className="grow">
        {/* header */}
        <div className="h-[48px] bg-white flex justify-center text-[20px] font-bold items-center">
          Create party
        </div>
        {/* gift recipient */}
        <div className="h-[133px] p-[24px]">
          <div className="text-[16px] font-bold leading-[20.8px] text-[#111111] mb-[16px]">
            Gift Recipient
          </div>
          <RecipientSelector
            defaultReceiver={{
              receiverId: "",
              receiverName: "",
              receiverPicture: "",
            }}
            setRecipientId={setReceiverId}
            defaultDisplaySelector={true}
          />
        </div>
        <div className="h-[8px] bg-[#DFDFDF]" />
        <div className="p-[24px]">
          <div className="text-[16px] leading-[20.8px] font-bold mb-[16px] text-[#111111]">
            Item
          </div>
          {/* insert url */}
          <div className="flex">
            <div className="relative grow">
              <input
                className="bg-[#F5F5F5] text-[12px] text-[#555555] h-[42px] w-[100%] rounded-[5px] pl-[12px] pr-[41px] outline-none placeholder-[#B7B7B7] truncate"
                value={lineShoppingUrl}
                onChange={(e) => {
                  setLineShoppingUrl(e.target.value);
                  setAddButtonDisable(false);
                }}
              />
              <LinkIcon className="absolute top-[9px] right-[9px]" />
            </div>
            {lineShoppingUrl !== "" && (
              <div className="ml-[8px]">
                <ButtonCustom
                  disable={addButtonDisable}
                  title="Add"
                  style="w-[65px] h-[41px] rounded-[5px] bg-[#06C755]"
                  onClick={getProductFromLink}
                />
              </div>
            )}
          </div>
          <div className="text-[#B7B7B7] text-[12px] leading-[15.6px] mt-[8px]">
            Insert product link from LINE SHOPPING
          </div>
          {/* product card */}
          {productDetail.productName !== "" && (
            <div className="h-[144px] w-[100%] border-[#DFDFDF] border rounded p-[16px] mt-[16px]">
              <div className="flex items-center">
                <UserIconCustom
                  img={productDetail.sellerPicture}
                  width={24}
                  height={24}
                />
                <span className="ml-[8px] text-[14px] font-semibold">
                  {productDetail.seller}
                </span>
              </div>
              <div className="mt-[16px] flex">
                <div className="w-[72px] ">
                  <ProductImgCustom
                    width={72}
                    height={72}
                    img={productDetail.productPicture}
                  />
                </div>
                <div className="ml-[12px] text-[16px] font-medium leading-[20.8px] truncate	">
                  {productDetail.productName}
                  <div className="mt-[4px] font-semibold text-[14px] text-[#555555]">
                    {" "}
                    ฿{productDetail.productPrice.toLocaleString("en-US")}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* variant select*/}
          {productDetail.haveVariant &&
            productDetail.variant.map((item, index) => (
              <div className="mt-[16px]">
                <h1 className="text-[14px] leading-[18.2px] font-semibold mb-[12px]">
                  {item.name}
                </h1>
                <div className="flex gap-[8px] mt-[12px] flex-wrap mb-[16px]">
                  {item.value.map((item) => (
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
      </div>
      {/* footer */}
      <div className="h-[97px] p-[24px] flex justify-center items-center">
        <ButtonCustom
          disable={handleDisableNextButton()}
          title="Next"
          onClick={onClickNext}
        />
      </div>
    </div>
  );
};

export default CreatePartySelectItem;
