import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as Birthday } from "../../icons/wishlistDetail/birthDayCake.svg";
import { ReactComponent as Gift } from "../../icons/wishlistDetail/gift.svg";
import { ReactComponent as HeartPlus } from "../../icons/myWishlist/heartPlus.svg";

import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import { LOADING, SUCCESS } from "../../utils/const";

import WishlistCard from "../../components/myWishlist/wishlistCard";
import ButtonCustom from "../../components/button";

import loadingGif from "../../icons/cakeGif.gif";
import ModalCustom from "../../components/modal";
import EmptyBlockCustom from "../../components/emptyBlock";

import { ReactComponent as LinkIcon } from "../../icons/createParty/link-solid.svg";
import { ReactComponent as Check } from "../../icons/myWishlist/check.svg";

import UserIconCustom from "../../components/userIcon";
import ProductImgCustom from "../../components/productImg";
import ToastCustom from "../../components/toast";

const MyWishlist = () => {
  const { idToken } = useContext(AuthContext);

  //   ======================== useState ========================

  const [userWishlist, setUserWishlist] = useState({
    displayName: "",
    pictureUrl: "",
    birthday: "",
    wishlist: [],
  });

  const [status, setStatus] = useState(LOADING);

  const [modalDelete, setModalDelete] = useState({
    display: false,
    transactionId: "",
    productName: "",
  });
  const [displayAddWishlist, setDisplayAddWishlist] = useState(false);
  const [lineShoppingUrl, setLineShoppingUrl] = useState("");
  const [productDetail, setProductDetail] = useState({
    productName: "",
    haveVariant: false,
    productPicture: "",
    productPrice: "",
    seller: "",
    sellerPicture: "",
    variant: [],
    discountPrice: "",
    haveDiscount: false,
    productId: "",
  });

  const [variantArray, setVariantArray] = useState([]);
  const [displayToast, setDisplayToast] = useState(false);

  //   ======================== useEffect ========================

  useEffect(() => {
    if (idToken !== "") {
      getMyWishlist();
    }
  }, [idToken]);

  useEffect(() => {
    getProductFromLink();
  }, [lineShoppingUrl]);

  //   ======================== function ========================

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
        haveDiscount: response.data.haveDiscount,
        discountPrice: response.data.discountPrice,
        seller: response.data.seller,
        productId: response.data.productId,
        sellerPicture: response.data.sellerPicture,
        variant: Object.entries(response.data.variant).map(([key, value]) => ({
          name: key,
          value: value,
        })),
      });
      setVariantArray(
        new Array(Object.keys(response.data.variant).length).fill(""),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const dateFormat = () => {
    if (userWishlist.birthday !== "") {
      const date = new Date(userWishlist.birthday)
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
        })
        .split(" ");

      return (date[1][0] === "0" ? date[1][1] : date[1]) + " " + date[0];
    }
    return "";
  };

  const daysToDate = () => {
    let today = new Date(Date.now());
    let todayMidNight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let userBD = new Date(userWishlist.birthday);
    let userBDMidNight = new Date(
      today.getFullYear(),
      userBD.getMonth(),
      userBD.getDate(),
    );
    userBDMidNight =
      userBDMidNight < todayMidNight
        ? new Date(today.getFullYear() + 1, userBD.getMonth(), userBD.getDate())
        : userBDMidNight;
    // console.log(userBDMidNight);
    const dayDiff = Math.floor(
      (userBDMidNight - todayMidNight) / (1000 * 60 * 60 * 24),
    );
    return dayDiff;
  };

  const getMyWishlist = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/myWishlist`,
        {
          params: {
            id: idToken,
          },
        },
      );
      setUserWishlist(response.data);
      setStatus(SUCCESS);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickDelete = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_PROXY}/wishlist/removeWishlist`,
        { transactionId: id },
      );

      // remove that product from wishList
      setUserWishlist((userWishlist) => ({
        ...userWishlist,
        wishlist: userWishlist.wishlist.filter(
          (product) => product.transactionId !== id,
        ),
      }));
      // close modal and set to init after delete complete
      setModalDelete({
        display: false,
        productName: "",
        transactionId: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onClickAddWishlist = async () => {
    try {
      if (!handleDisableNextButton()) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_PROXY}/wishlist/addWishlist`,
          {
            userId: idToken,
            productId: productDetail.productId,
            variantOption1: variantArray[0] ? variantArray[0] : null,
            variantOption2: variantArray[1] ? variantArray[1] : null,
          },
        );
        setDisplayAddWishlist(false);

        setUserWishlist((userWishlist) => ({
          ...userWishlist,
          wishlist: [
            ...userWishlist.wishlist,
            {
              productId: productDetail.productId,
              haveDiscount: productDetail.haveDiscount,
              discountPrice: productDetail.discountPrice,
              productName: productDetail.productName,
              productPicture: productDetail.productPicture,
              productPrice: productDetail.productPrice,
              transactionId: response.data.transactionId,
              variantText: response.data.variantText,
            },
          ],
        }));
      }
      setProductDetail({
        productName: "",
        haveVariant: false,
        productPicture: "",
        productPrice: "",
        seller: "",
        sellerPicture: "",
        variant: [],
        discountPrice: "",
        haveDiscount: false,
        productId: "",
      });
      setVariantArray([]);
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
      }, 2000);
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

  if (status === LOADING)
    return (
      <div className="grow flex justify-center items-center">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return (
    <>
      <style>
        {`
      .shadowButton{box-shadow: 0px 4px 16px 0px #0000001A;}

      `}
      </style>
      <div className="flex-col flex grow overflow-y-scroll">
        {userWishlist.wishlist.length === 0 ? (
          <EmptyBlockCustom
            title="You have no wishlist"
            subTitle="Let’s explore for something good!"
          />
        ) : (
          <>
            <div className="h-[128px] px-[24px] py-[16px] border-b border-[#DFDFDF]">
              {/* profile pic and name */}
              <div className="flex items-center">
                <div className="h-[32px] w-[32px] flex justify-center items-center overflow-hidden rounded-full mr-[10px]">
                  <img src={userWishlist.pictureUrl} />
                </div>
                <span className="text-[18px] font-medium">Hello, </span>
                <span className="text-[18px] font-bold">
                  {userWishlist.displayName}
                </span>
              </div>
              {/* birthday &&  total wishlist */}
              <div className="mt-[24px] justify-between h-[40px] flex">
                <div className="flex">
                  <Birthday className="mr-[8px]" />
                  <div>
                    <p className="text-[14px] font-semibold">{dateFormat()}</p>
                    <p className="text-[12px] text-[#777777]">
                      {daysToDate()} days until birthday
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Gift className="mr-[8px]" />
                  <div>
                    <p className="text-[14px] font-semibold">
                      {userWishlist.wishlist.length}
                    </p>
                    <p className="text-[12px] text-[#777777]">Wishlists</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[36px] flex flex-col items-center gap-[32px] grow  overflow-y-scroll">
              {userWishlist.wishlist.map((information) => (
                <WishlistCard
                  key={information.transactionId}
                  wishlistInformation={information}
                  onClickDelete={() => {
                    setModalDelete({
                      display: true,
                      transactionId: information.transactionId,
                      productName: information.productName,
                    });
                  }}
                />
              ))}
            </div>
          </>
        )}
        <div className=" h-[97px] p-[24px] flex justify-center relative">
          <ButtonCustom
            title="Explore Line Shopping"
            onClick={() => {
              window.location.href = "https://shop.line.me/home/";
            }}
          />
          {/* add wishlish block */}
          <div
            className="absolute right-[24px] top-[-64px] border-[#DFDFDF] h-[64px] w-[64px] border rounded-full shadowButton flex justify-center items-center"
            onClick={() => {
              setDisplayAddWishlist(true);
            }}
          >
            <HeartPlus />
          </div>
        </div>
      </div>

      {/* toast */}
      {displayToast && (
        <ToastCustom
          icon={<Check />}
          tittle={
            <div className="flex flex-col items-center">
              <p>New item added</p>
              <p>to wishlist!</p>
            </div>
          }
        />
      )}

      {/* add wishlist */}
      {displayAddWishlist && (
        <div className="absolute top-0 h-[100dvh]  w-[100%] bg-[#11111180] flex justify-center items-center">
          <div className="w-[294px] px-[24px] pt-[32px] pb-[16px] flex flex-col items-center rounded-[21px] bg-white">
            <p className="text-[16px] leading-[21px] font-bold">Add wishlist</p>
            <p className="text-[14px] text-[#777777] mb-[16px]">
              Insert item link from LINE SHOPPING
            </p>
            {/* insert block */}
            <div className="relative w-[100%]">
              <input
                className="bg-[#F5F5F5] text-[12px] text-[#555555] h-[42px] w-[100%] rounded-[5px] pl-[12px] pr-[41px] outline-none placeholder-[#B7B7B7] truncate"
                value={lineShoppingUrl}
                onChange={(e) => {
                  setLineShoppingUrl(e.target.value);
                }}
              />
              <LinkIcon className="absolute top-[9px] right-[9px]" />
            </div>
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

                    {productDetail.haveDiscount ? (
                      <div className="flex h-[16px] mt-[4px] items-center">
                        <div className="text-[12px]  font-semibold line-through mr-[4px]">
                          ฿{productDetail.productPrice.toLocaleString("en-US")}
                        </div>
                        <div className="text-[14px] font-semibold leading-[15.6px] text-[#FF334B]">
                          ฿{productDetail.discountPrice.toLocaleString("en-US")}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[14px] font-semibold mt-[8px] leading-[15.6px]">
                        ฿{productDetail.productPrice.toLocaleString("en-US")}
                      </div>
                    )}
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
            {/* button */}
            <div className="h-[49px] flex gap-[8px] ">
              <div
                className="h-[49px] w-[119px] flex justify-center items-center font-bold"
                onClick={() => {
                  setDisplayAddWishlist(false);
                }}
              >
                Cancel
              </div>
              <div
                className={`h-[49px] w-[119px] flex justify-center items-center font-bold ${!handleDisableNextButton() ? "text-[#06C755]" : "text-[#DFDFDF]"}`}
                onClick={onClickAddWishlist}
              >
                Add
              </div>
            </div>
          </div>
        </div>
      )}

      {modalDelete.display && (
        <ModalCustom
          handleCancel={() => {
            setModalDelete({
              display: false,
              productName: "",
              transactionId: "",
            });
          }}
          handleConfirm={() => {
            onClickDelete(modalDelete.transactionId);
          }}
          title={
            <div>
              <p>You’re going to delete</p>
              <p> “{modalDelete.productName}"</p>
              <p>from your wishlist.</p>
            </div>
          }
          subTitle={<p>This process cannot be undone.</p>}
          confirmTitle="Delete"
          confirmStyle="text-[#FF334B]"
        />
      )}
    </>
  );
};

export default MyWishlist;
