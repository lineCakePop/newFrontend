import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  LOADING,
  ONGOING,
  SUCCESS,
  VERIFIED,
  WAITFORMEMBER,
} from "../../utils/const";

import loadingGif from "../../icons/cakeGif.gif";

import PartyHeader from "../../components/partyDetail/partyHeader";
import BillSummary from "../../components/billSummary";
import ButtonCustom from "../../components/button";

import { ReactComponent as RedBin } from "../../icons/billSharingParty/redBin.svg";
import { ReactComponent as GrayBin } from "../../icons/billSharingParty/grayBin.svg";
import { ReactComponent as ToastCheck } from "../../icons/billSharingParty/toastCheck.svg";

import liff from "@line/liff";

import ReceivingAccountCard from "../../components/partyDetail/receivingAccountCard";
import BillSharingPartyMemberCard from "../../components/partyDetail/billSharingPartyMemberCard";
import ToastCustom from "../../components/toast";

const BillSharingParty = () => {
  const navigate = useNavigate();

  const { partyId, fromFlex } = useParams();

  const { idToken } = useContext(AuthContext);

  // ================ useState ================

  const [partyInformation, setPartyInformation] = useState({
    giftPrice: 0,
    discount: 0,
    shippingPrice: 0,
    addCost: 0,
    host: { hostId: "", hostName: "", hostPicture: "", you: false },
    maxMember: 0,
    member: [],
    partyDate: "",
    partyId: "",
    partyStatus: "",
    lastStatusDate: null,
    product: {
      productName: "",
      productPicture: "",
      seller: "",
      sellerPicture: "",
      variant: "",
      productPrice: 0,
      discountPrice: 0,
      haveDiscount: false,
    },
    receiver: {
      receiverId: "",
      receiverName: "",
      receiverPicture: "",
    },
  });

  const [status, setStatus] = useState(LOADING);

  const [partyMember, setPartyMember] = useState([]);
  const [displayToast, setDisplayToast] = useState(false);

  const giftTotal = partyInformation.product.haveDiscount
    ? partyInformation.product.discountPrice
    : partyInformation.product.productPrice;

  // ================ useEffect ================

  useEffect(() => {
    if (partyId !== "" && idToken !== "") {
      getPartyDetail();
    }
  }, [partyId, idToken]);

  // ================ function ================

  const getPartyDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/party/partyDetail`,
        {
          params: {
            id: partyId,
            uid: idToken,
            // uid: "eyJraWQiOiJmZTFlOGQ4ODhlYzY2NGNkMmFmZWY0NzljNWRiNzk2OTJjZDAxYWFjZDE0MTQ4M2E1NDMzOTM1MWYzOTVmYTI3IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVWRjMGIwMzAzMzY1ZDZhMTVlYjI2NWRiZjVjZTcyNzNlIiwiYXVkIjoiMjAwMzYxOTE2NSIsImV4cCI6MTcxMTEwODE0NCwiaWF0IjoxNzExMTA0NTQ0LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4LmE4Lih4LmJ4LmB4LiB4LmI4LiZIiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoQW4tUVBfQUZIa0VRS0EyclBnRmhGaXh0RUN4bkJoZ0phRWNGSWpaOEZYWnVTMTFEZmtoVGMyRjRTU1ZvU3d4SEx4MVNJekVwRW5JLSJ9.a87lMGpk52_pKOwQE2X9lmKfEr_vdClUc0QLH3GSx0ThkAeVyESaXpF7wsA9UYheRvhZSQGALZZm7AyKLH1Klw",
          },
        },
      );
      setStatus(SUCCESS);
      console.log(response.data);
      setPartyInformation(response.data);
      setPartyMember([
        {
          name: response.data.host.hostName,
          profile: response.data.host.hostPicture,
          owner: true,
          you: response.data.host.you,
          paidStatus: VERIFIED,
          id: response.data.host.hostId,
        },
        ...response.data.member.map((member) => ({
          id: member.slipId,
          name: member.memberName,
          profile: member.memberPicture,
          owner: false,
          you: member.you,
          paidStatus: member.paidStatus,
          slipPicture: member.slipPicture,
          slipDate: member.slipDate,
          paidDate: member.paidDate,
          slipId: member.slipId,
        })),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const checkFinishParty = () => {
    const allMemberVerify = partyMember.every(
      (user) => user.paidStatus === VERIFIED,
    );
    return allMemberVerify;
  };

  const onClickDeleteParty = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_PROXY}/party/deleteParty`, {
        tokenId: idToken,
        partyId: partyId,
      });
      if (fromFlex === "true") {
        liff.closeWindow();
      } else {
        navigate("/party");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickFinishParty = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_PROXY}/party/finishParty`, {
        tokenId: idToken,
        partyId: partyId,
      });
      if (fromFlex === "true") {
        liff.closeWindow();
      } else {
        navigate("/party");
      }
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
    <div className="h-[100dvh] relative">
      {displayToast && (
        <ToastCustom
          tittle={
            <div className="flex flex-col items-center">
              <div>Accont number</div>
              copied
            </div>
          }
          icon={<ToastCheck />}
        />
      )}
      <PartyHeader
        title="Bill Sharing Party"
        fromFlex={fromFlex}
        joinParty={false}
        lastStatusDate={partyInformation.lastStatusDate}
        partyStatus={partyInformation.partyStatus}
        productName={partyInformation.product.productName}
        productPicture={partyInformation.product.productPicture}
        seller={partyInformation.product.seller}
        sellerPicture={partyInformation.product.sellerPicture}
        variant={partyInformation.product.variant}
        productPrice={partyInformation.product.productPrice}
        discountPrice={partyInformation.product.discountPrice}
        haveDiscount={partyInformation.product.haveDiscount}
        createBy={partyInformation.host.hostName}
        partyDate={partyInformation.partyDate}
        partyExpireDate={partyInformation.partyExpireDate}
        receiverName={partyInformation.receiver.receiverName}
        receiverPicture={partyInformation.receiver.receiverPicture}
      />
      <div className="bg-[#DFDFDF] h-[8px] " />
      <div className="p-[24px] border-b border-[#DFDFDF]">
        <BillSummary
          giftPrice={giftTotal}
          shippingPrice={partyInformation.shippingPrice}
          discount={partyInformation.discount}
          addCost={partyInformation.addCost}
          totalMember={partyInformation.maxMember}
        />
        <h3 className="mt-[32px] text-[#555555] text-[14px] mb-[16px]">
          Receiving Account
        </h3>
        <ReceivingAccountCard
          accountId={"012-345-6789"}
          name={"Doraemon San"}
          setDisplayToast={setDisplayToast}
        />
      </div>
      {/* member */}
      <div className="p-[24px]">
        {/* party header */}
        <div className="h-[21px] mb-[16px] flex justify-between">
          <span className="text-[16px] font-bold">Party Members</span>
          <span className="text-[#06C755] font-bold">
            {partyMember.length}
            <span className="text-[#949494]">
              /{partyInformation.maxMember}
            </span>
          </span>
        </div>
        {partyMember.map((user) => (
          <BillSharingPartyMemberCard
            key={user.id}
            id={user.id}
            setPartyMember={setPartyMember}
            name={user.name}
            profile={user.profile}
            owner={user.owner}
            you={user.you}
            ownerOfParty={partyInformation.host.you}
            paidStatus={user.paidStatus}
            slipPicture={user.slipPicture}
            paidDate={user.paidDate}
            slipDate={user.slipDate}
            partyStatus={partyInformation.partyStatus}
            slipId={user.slipId}
          />
        ))}
      </div>
      {/* footer */}
      {/* owner of party */}
      {partyInformation.host.you && (
        <div className="p-[24px] flex flex-col items-center">
          {/* ongoing but someone didnt pay */}
          {checkFinishParty() && partyInformation.partyStatus === ONGOING && (
            <>
              <ButtonCustom title="Finished" onClick={onClickFinishParty} />
              <div className="mt-[12px] flex gap-[10px] justify-center items-center h-[52px]">
                <GrayBin />{" "}
                <span className="text-[14px] text-[#B7B7B7]">Delete Party</span>
              </div>
            </>
          )}
          {/* ongoing all member pay */}
          {partyInformation.partyStatus === ONGOING && !checkFinishParty() && (
            <>
              <ButtonCustom title="Unfinished Payment" disable />
              <div
                className="mt-[12px] flex gap-[10px] justify-center items-center h-[52px] "
                onClick={onClickDeleteParty}
              >
                <RedBin />{" "}
                <span className="text-[14px] text-[#FF334B]">Delete Party</span>
              </div>
            </>
          )}
        </div>
      )}
      {/* waiting member to join */}
      {partyInformation.partyStatus === WAITFORMEMBER && (
        <>
          <div className="p-[24px] flex flex-col items-center">
            <div className="h-[49px] rounded-[5px] border border-[#DFDFDF] w-[100%] flex justify-center items-center">
              <span className="text-[#DFDFDF] text-[16px] font-bold">
                Waiting For Others
              </span>
            </div>
            {partyInformation.host.you && (
              <div
                className="mt-[12px] flex gap-[10px] justify-center items-center h-[52px] "
                onClick={onClickDeleteParty}
              >
                <RedBin />{" "}
                <span className="text-[14px] text-[#FF334B]">Delete Party</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BillSharingParty;
