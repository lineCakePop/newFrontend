import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import liff from "@line/liff";

import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import { LOADING, SUCCESS } from "../../utils/const";

// =============== svg ===============
import { ReactComponent as Remove } from "../../icons/createParty/remove_circle_outline_black.svg";
import { ReactComponent as Add } from "../../icons/createParty/add_circle_outline_black.svg";

// =============== Components ===============
import Loading from "../Loading";
import ProductDetail from "../../components/productDetail";
import BillSummary from "../../components/billSummary";
import RecipientSelector from "../../components/createParty/recipientSelector";
import ButtonCustom from "../../components/button";
import ReceivingAccountCard from "../../components/partyDetail/receivingAccountCard";

const CreateParty = () => {
  const location = useLocation();

  const { targetWishlist, userWishlist } = location.state;

  const { idToken } = useContext(AuthContext);

  // =============== setState ===============
  const [gift, setGift] = useState({
    discountPrice: 0,
    haveDiscount: false,
    productId: "",
    productName: "",
    productPicture: "",
    productPrice: 0,
    seller: "",
    sellerPicture: "",
    variantText: "",
  });
  const [receiver, setReceiver] = useState({
    displayName: "",
    pictureUrl: "",
    _id: "",
  });
  const [profile, setProfile] = useState({
    displayName: "",
    pictureUrl: "",
    userId: "",
  });

  const [status, setStatus] = useState(LOADING);

  const [shippingFee, setShippingFee] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [members, setMembers] = useState(2);

  const [totalPrice, setTotalPrice] = useState("");
  const [eachPrice, setEachPrice] = useState("");

  // =============== Axios ===============
  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/userProfile`,
        {
          params: {
            id: idToken,
          },
        },
      );
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const postCreateParty = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/party/createParty`,
        {
          userId: idToken,
          maxMember: members,
          receiverId: receiver._id,
          productId: gift.productId,
          productPrice: gift.productPrice,
          discountPrice: gift.discountPrice,
          addCost: additionalCost,
          discount: discount,
          shippingPrice: shippingFee,
          variantOption1: gift.variantText,
          variantOption2: null,
        },
      );

      handleShareTargetPicker(response.data.partyId);
    } catch (error) {
      console.log(error);
    }
  };

  // =============== useEffect ===============
  useEffect(() => {
    console.log("userWishlist", userWishlist);
    console.log("targetWishlist", targetWishlist);

    if (location && userWishlist) {
      setGift(targetWishlist);
      setReceiver({
        _id: userWishlist._id,
        displayName: userWishlist.displayName,
        pictureUrl: userWishlist.pictureUrl,
      });
      setStatus(SUCCESS);
    }
  }, []);

  useEffect(() => {
    if (idToken !== "") {
      getUserProfile();
    }
  }, [idToken]);

  useEffect(() => {
    if (gift) {
      const giftPrice = gift.haveDiscount
        ? gift.discountPrice
        : gift.productPrice;
      const total = giftPrice + shippingFee - discount + additionalCost;
      const each = total / members;

      setTotalPrice(
        `฿${
          total
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
            .split("$")[1]
        }`,
      );

      setEachPrice(
        `฿${
          each
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
            .split("$")[1]
        }`,
      );
    }
  }, [gift, additionalCost, discount, shippingFee]);

  // =============== Handler ===============
  const handleShareTargetPicker = (partyId) => {
    liff
      .shareTargetPicker(
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
                  // header
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
                            text: `${members} `,
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
                  // separator
                  {
                    type: "separator",
                    margin: "0px",
                  },
                  // receiver
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
                            // receiver picture
                            url: receiver.pictureUrl,
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
                                text: receiver.displayName,
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
                                text: profile.displayName,
                              },
                            ],
                            size: "10px",
                            color: "#555555",
                          },
                        ],
                        margin: "12px",
                        justifyContent: "space-between",
                        spacing: "4px",
                        width: "180px",
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "image",
                            url: "https://firebasestorage.googleapis.com/v0/b/cakepop-be50a.appspot.com/o/IMG_6841.PNG?alt=media&token=c18a5ce9-0963-45a3-b645-c224f3fce7c4",
                            aspectMode: "cover",
                            size: "32px",
                          },
                        ],
                        height: "32px",
                        width: "32px",
                      },
                    ],
                    paddingAll: "20px",
                  },
                  // separator
                  {
                    type: "separator",
                    margin: "0px",
                  },
                  // product
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
                            url: gift.productPicture,
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
                                text: gift.productName,
                                size: "14px",
                                color: "#111111",
                                weight: "bold",
                              },
                              {
                                type: "text",
                                text: gift.variantText ? gift.variantText : " ",
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
                                text: totalPrice,
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
                                text: eachPrice,
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
                  // button
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
                              uri: `https://linecakepop.netlify.app/join-party/${partyId}`,
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
      )
      .catch(function (error) {
        console.log("something wrong happen");
      });
  };

  const handleChooseFriend = () => {
    postCreateParty();
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
          defaultReceiver={receiver}
          setReceiver={setReceiver}
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

        <ReceivingAccountCard
          name="Doraemon San"
          accountId="012-345-6789"
          edit={true}
        />
      </div>

      <div className="p-[24px] flex justify-center">
        <ButtonCustom title="Choose Friend" onClick={handleChooseFriend} />
      </div>
    </div>
  );
};

export default CreateParty;
