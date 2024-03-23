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

  const [displayModal, setDisplayModal] = useState(false);

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
      // setClose(true);
      setDisplayModal(true);
    } catch (err) {}
  };

  if (status === LOADING)
    return (
      <div className="h-[100dvh] flex justify-center items-center">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return (
    <div className="h-[100dvh] relative">
      <PartyHeader
        title="Let’s join the party!"
        joinParty={true}
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
          title={
            partyMember.some((member) => member.you)
              ? "You joined the party"
              : "Join"
          }
          onClick={joinParty}
          disable={
            partyMember.length === partyInformation.maxMember ||
            partyMember.some((member) => member.you)
          }
        />
      </div>
      {/* modal */}
      {displayModal && (
        <div className="w-[100%] absolute top-0 h-[100dvh] bg-[#11111180] flex justify-center items-center">
          <div className="h-[178px] w-[278px] rounded-[20px] bg-white flex flex-col items-center pt-[32px] pb-[16px]">
            <p className="font-bold leading-[21px]">You joined the party</p>
            <p className="text-[14px] mt-[8px] text-[#777777]">
              Go to Line Birthday for
            </p>
            <p className="text-[#777777] text-[14px]">the next step</p>
            <div
              className="h-[49px] flex items-center mt-[16px] text-[#06C755] font-semibold"
              onClick={() => {
                setDisplayModal(false);
              }}
            >
              OK
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinParty;
