import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LOADING, SUCCESS } from "../../utils/const";

import loadingGif from "../../icons/cakeGif.gif";

import PartyHeader from "../../components/partyDetail/partyHeader";
import BillSummary from "../../components/billSummary";
import JoinPartyCard from "../../components/partyDetail/joinPartyMemberCard";
import ButtonCustom from "../../components/button";

import liff from "@line/liff";

const JoinParty = () => {
  const { partyId } = useParams();

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

  const [close, setClose] = useState(false);

  const giftTotal = partyInformation.product.haveDiscount
    ? partyInformation.product.discountPrice
    : partyInformation.product.productPrice;

  // ================ useEffect ================

  useEffect(() => {
    if (partyId !== "" && idToken !== "") {
      getPartyDetail();
    }
  }, [partyId, idToken]);

  useEffect(() => {
    if (close) {
      liff.closeWindow();
    }
  }, [close]);

  // ================ function ================

  const getPartyDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/party/partyDetail`,
        {
          params: {
            id: partyId,
            uid: idToken,
          },
        },
      );
      setStatus(SUCCESS);
      setPartyInformation(response.data);
      setPartyMember([
        {
          name: response.data.host.hostName,
          profile: response.data.host.hostPicture,
          owner: true,
          you: response.data.host.you,
        },
        ...response.data.member.map((member) => ({
          name: member.memberName,
          profile: member.memberPicture,
          owner: false,
          you: member.you,
        })),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const joinParty = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_PROXY}/party/joinParty`, {
        userId: idToken,
        partyId: partyId,
      });
      setClose(true);
    } catch (err) {}
  };

  if (status === LOADING)
    return (
      <div className="h-[100dvh] flex justify-center items-center">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return (
    <div className="">
      <PartyHeader
        title="Let’s join the party!"
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
      </div>
      {/* party member */}
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
        {partyMember.map((member) => (
          <JoinPartyCard
            name={member.name}
            profile={member.profile}
            owner={member.owner}
            you={member.you}
          />
        ))}
      </div>
      {/* footer */}
      <div className="h-[97px] p-[24px] flex justify-center">
        <ButtonCustom
          title="Join"
          onClick={joinParty}
          disable={
            partyMember.length === partyInformation.maxMember ||
            partyMember.some((member) => member.you)
          }
        />
      </div>
    </div>
  );
};

export default JoinParty;
