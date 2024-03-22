import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { LOADING, SUCCESS } from "../../utils/const";

import { ReactComponent as Remove } from "../../icons/createParty/remove_circle_outline_black.svg";
import { ReactComponent as Add } from "../../icons/createParty/add_circle_outline_black.svg";

import Loading from "../Loading";
import ProductDetail from "../../components/productDetail";
import BillSummary from "../../components/billSummary";
import RecipientSelector from "../../components/createParty/recipientSelector";
import ButtonCustom from "../../components/button";

import liff from "@line/liff";

const CreateParty = () => {
  const [receiverId, setReceiverId] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const location = useLocation();
  const { targetWishlist, userWishlist } = location.state;

  const [gift, setGift] = useState();
  const [defaultReceiver, setDefaultReceiver] = useState();

  const [status, setStatus] = useState(LOADING);

  const [shippingFee, setShippingFee] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [members, setMembers] = useState(2);

  useEffect(() => {
    console.log("userWishlist", userWishlist);
    console.log("targetWishlist", targetWishlist);

    if (location && userWishlist) {
      setGift(targetWishlist);
      setDefaultReceiver(userWishlist);
      setReceiverId(userWishlist._id);
      setStatus(SUCCESS);
    }
  }, []);

  useEffect(() => {
    console.log("receiverName", receiverName);
  }, [receiverName]);

  //   {
  //     "userId": "eyJraWQiOiJhMmE0NTlhZWM1YjY1ZmE0ZThhZGQ1Yzc2OTdjNzliZTQ0NWFlMzEyYmJjZDZlZWY4ZmUwOWI1YmI4MjZjZjNkIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVWUxMmYzOGZhYTQwYTkyZTg1M2EyNzFhNjg0OTZkMDRjIiwiYXVkIjoiMjAwMzYxOTE2NSIsImV4cCI6MTcxMDE0MDA1MiwiaWF0IjoxNzEwMTM2NDUyLCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoiTm9uIiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoLUlsRGxTSG1jbVpSUFdkNG9YZ05NVzE0ZkFzbUUzUXVLVjl1VkhSb0xWWXBEakV6YjF3NlYzRV9ld04tWGpFeGJ3czZCbnhvZjE5NyJ9.GeUFFOsCb-J7ii0U7ttlxRH32gEA92SFehBbDkOPMIvaD4T0YI6IZ-ivqZjC2VNt7uDyvqyZaOuT67xUENJ6NA", // tokenId
  //     "maxMember": 2,
  //     "recieverId": "65d5b262d2b63ba97f85446d",
  //     "productId": "65d36f22881470fd62b5c05c",
  //     "productPrice": 790,
  //     "discount": 0,
  //     "shippingPrice": 50,
  //     "variantOption1": null,
  //     "variantOption2": null
  // }

  const getTextWidth = (text, font = "sfpro") => {
    // Create a temporary span element
    const span = document.createElement("span");

    // Set the font if provided
    if (font) {
      span.style.font = font;
    }

    // Set the text content
    span.textContent = text;

    // Set span to be absolutely positioned and off-screen
    span.style.position = "absolute";
    span.style.left = "-9999px";

    // Append the span to the body
    document.body.appendChild(span);

    // Get the width of the span
    const width = span.offsetWidth;

    // Remove the span from the DOM
    document.body.removeChild(span);

    return width;
  };

  const handleShareTargetPicker = () => {
    try {
      liff.shareTargetPicker(
        [
          {
            type: "flex",
            altText: "Let’s join Sharing Party",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "Let’s join Sharing Party",
                        weight: "bold",
                        color: "#111111",
                        size: "16px",
                      },
                      {
                        type: "text",
                        text: "4",
                        size: "16px",
                        weight: "bold",
                        scaling: false,
                        contents: [
                          {
                            type: "span",
                            text: "4 ",
                            color: "#06C755",
                          },
                          {
                            type: "span",
                            text: "Members",
                            color: "#949494",
                          },
                        ],
                      },
                    ],
                    paddingStart: "20px",
                    paddingAll: "20px",
                    spacing: "8px",
                  },
                  {
                    type: "separator",
                    margin: "0px",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "image",
                            url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                            aspectMode: "cover",
                          },
                        ],
                        cornerRadius: "100px",
                        height: "36px",
                        width: "36px",
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "hello, world",
                            contents: [
                              {
                                type: "span",
                                text: "Sally",
                                weight: "bold",
                              },
                              {
                                type: "span",
                                text: "‘s Gift",
                              },
                            ],
                            size: "14px",
                          },
                          {
                            type: "text",
                            text: "hello, world",
                            contents: [
                              {
                                type: "span",
                                text: "Created party by ",
                              },
                              {
                                type: "span",
                                text: "Mon A",
                              },
                            ],
                            size: "10px",
                            color: "#555555",
                          },
                        ],
                        margin: "12px",
                        justifyContent: "space-between",
                        spacing: "4px",
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "image",
                            url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                            aspectMode: "cover",
                          },
                        ],
                        height: "32px",
                        width: "32px",
                      },
                    ],
                    paddingAll: "20px",
                  },
                  {
                    type: "separator",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "image",
                            url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                            aspectMode: "cover",
                          },
                        ],
                        cornerRadius: "8px",
                        height: "48px",
                        width: "48px",
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "box",
                            layout: "vertical",
                            contents: [
                              {
                                type: "text",
                                text: "Bonjour Tote Bag",
                                size: "14px",
                                color: "#111111",
                                weight: "bold",
                              },
                              {
                                type: "text",
                                text: "white",
                                size: "12px",
                                color: "#555555",
                              },
                            ],
                            spacing: "4px",
                          },
                          {
                            type: "box",
                            layout: "horizontal",
                            contents: [
                              {
                                type: "text",
                                text: "Total",
                                size: "12px",
                                color: "#555555",
                                weight: "regular",
                              },
                              {
                                type: "text",
                                text: "฿1,400.00",
                                size: "12px",
                                color: "#555555",
                                align: "end",
                              },
                            ],
                            spacing: "4px",
                            justifyContent: "space-between",
                          },
                          {
                            type: "box",
                            layout: "horizontal",
                            contents: [
                              {
                                type: "text",
                                text: "Your Payment",
                                size: "14px",
                                color: "#111111",
                                weight: "regular",
                              },
                              {
                                type: "text",
                                text: "฿350.00",
                                size: "12px",
                                color: "#111111",
                                align: "end",
                                weight: "bold",
                              },
                            ],
                            spacing: "4px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                        ],
                        margin: "12px",
                        justifyContent: "space-between",
                        spacing: "8px",
                      },
                    ],
                    paddingAll: "20px",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "Join The Party",
                            size: "16px",
                            color: "#FFFFFF",
                            weight: "bold",
                            action: {
                              type: "uri",
                              label: "action",
                              uri: "http://linecorp.com/",
                            },
                          },
                        ],
                        width: "265px",
                        height: "49px",
                        backgroundColor: "#06C755",
                        cornerRadius: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ],
                    paddingAll: "20px",
                  },
                ],
                margin: "0px",
                paddingAll: "0px",
              },
              styles: {
                footer: {
                  separator: true,
                },
              },
            },
          },
        ],
        {
          isMultiple: true,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseFriend = () => {
    handleShareTargetPicker();
  };

  if (status === LOADING) {
    return <Loading />;
  }

  return (
    <div className=" ">
      <div className="h-[56px] flex justify-center items-center">
        <div className="leading-[20px] text-[20px] font-bold">Create Party</div>
      </div>

      <div className="p-[24px]">
        <div className="leading-[20.8px] text-[16px] font-bold mb-[16px]">
          Gift Recipient
        </div>

        <RecipientSelector
          defaultReceiver={{
            receiverId: receiverId,
            receiverName: defaultReceiver.displayName,
            receiverPicture: defaultReceiver.pictureUrl,
          }}
          setRecipientId={setReceiverId}
        />
      </div>

      <div className="h-[8px] bg-[#DFDFDF]"></div>

      <div className="p-[24px]">
        <ProductDetail
          productName={gift.productName}
          productPicture={gift.productPicture}
          seller={gift.seller}
          sellerPicture={gift.sellerPicture}
          variant={gift.variant}
          productPrice={gift.productPrice}
          discountPrice={gift.discountPrice}
          haveDiscount={gift.haveDiscount}
        />
      </div>

      <div className="p-[24px] flex flex-col gap-[16px]">
        {/* Shipping Fee */}
        <div className="flex items-center justify-between">
          <div className="text-[14px] leading-[18.2px] font-semibold">
            Shipping Fee
          </div>
          <div className="flex items-center relative">
            <div className="text-[#949494] text-[14px] leading-[18.2px] font-semibold mr-[16px]">
              +
            </div>

            <input
              className={`bg-[#F5F5F5] h-[36px] rounded-[5px] pl-[12px] pr-[30px] flex items-center text-[14px] font-normal leading-[18.2px]`}
              style={{
                width:
                  shippingFee.toString().length > 4
                    ? `${getTextWidth(shippingFee.toString()) + 12 + 30}px`
                    : "84px",
              }}
              onChange={(e) => {
                const enteredValue = parseFloat(
                  e.target.value.replace(/\D/g, ""),
                );

                setShippingFee(enteredValue);
              }}
              type="text"
              value={shippingFee ? shippingFee : ""}
            />
            <div className="absolute right-[12px]  text-gray-400">฿</div>
          </div>
        </div>

        {/* Additional Cost */}
        <div className="flex items-center justify-between">
          <div className="text-[14px] leading-[18.2px] font-semibold">
            Additional Cost
          </div>
          <div className="flex items-center relative">
            <div className="text-[#949494] text-[14px] leading-[18.2px] font-semibold mr-[16px]">
              +
            </div>

            <input
              className={`bg-[#F5F5F5] h-[36px] rounded-[5px] pl-[12px] pr-[30px] flex items-center text-[14px] font-normal leading-[18.2px]`}
              style={{
                width:
                  additionalCost.toString().length > 4
                    ? `${getTextWidth(additionalCost.toString()) + 12 + 30}px`
                    : "84px",
              }}
              onChange={(e) => {
                const enteredValue = parseFloat(
                  e.target.value.replace(/\D/g, ""),
                );

                setAdditionalCost(enteredValue);
              }}
              type="text"
              value={additionalCost ? additionalCost : ""}
            />
            <div className="absolute right-[12px]  text-gray-400">฿</div>
          </div>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between">
          <div className="text-[14px] leading-[18.2px] font-semibold">
            Discount
          </div>
          <div className="flex items-center relative">
            <div className="text-[#949494] text-[14px] leading-[18.2px] font-semibold mr-[16px]">
              -
            </div>

            <input
              className={`bg-[#F5F5F5] h-[36px] rounded-[5px] pl-[12px] pr-[30px] flex items-center text-[14px] font-normal leading-[18.2px]`}
              style={{
                width:
                  discount.toString().length > 4
                    ? `${getTextWidth(discount.toString()) + 12 + 30}px`
                    : "84px",
              }}
              onChange={(e) => {
                const enteredValue = parseFloat(
                  e.target.value.replace(/\D/g, ""),
                );

                setDiscount(enteredValue);
              }}
              type="text"
              value={discount ? discount : ""}
            />
            <div className="absolute right-[12px]  text-gray-400">฿</div>
          </div>
        </div>
      </div>

      <div className="p-[24px]">
        <div className="leading-[20.8px] text-[16px] font-bold mb-[16px]">
          How Many Members?
        </div>

        <div className="flex justify-center items-center gap-[16px] ">
          <Remove
            onClick={() => {
              if (members !== 2) {
                setMembers(members - 1);
              }
            }}
          />
          <div className="leading-[20.8px] text-[16px] font-bold">
            {members}
          </div>
          <Add
            onClick={() => {
              setMembers(members + 1);
            }}
          />
        </div>
      </div>

      <div className="py-[16px] px-[24px]">
        <BillSummary
          giftPrice={gift.haveDiscount ? gift.discountPrice : gift.productPrice}
          shippingPrice={shippingFee}
          discount={discount}
          addCost={additionalCost}
          totalMember={members}
        />
      </div>

      <div className="p-[24px]">
        <div className="text-[14px] leading-[18.2px] font-semibold mb-[16px]">
          Receiving Account
        </div>
      </div>

      <div className="p-[24px] flex justify-center">
        <ButtonCustom title="Choose Friend" onClick={handleChooseFriend} />
      </div>
    </div>
  );
};

export default CreateParty;
