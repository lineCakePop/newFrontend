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
import ReceivingAccountCard from "../../components/partyDetail/receivingAccountCard";

const BillSharingParty = () => {
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
    if (partyId !== "") {
      getPartyDetail();
    }
  }, [partyId]);

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
        },
        ...response.data.member.map((member) => ({
          name: member.memberName,
          profile: member.memberPicture,
          owner: false,
        })),
      ]);
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
    <div className="">
      <PartyHeader
        title="Bill Sharing Party"
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
        />
      </div>
    </div>
  );
};

export default BillSharingParty;
