import BillSummary from "../../components/billSummary";
import PartyHeader from "../../components/partyDetail/partyHeader";

const JoinParty = () => {
  return (
    <div className="">
      <PartyHeader
        title="Let’s join the party!"
        productName="mini tote- dec 2023"
        productPicture="https://d.line-scdn.net/obs/r/ect/ect/image_170306648681276807322dc6866t12bee266"
        seller="everyday apparels"
        sellerPicture="https://profile.line-scdn.net/0hWLMiq4BYCGNwEBwbHgJ3NExVBg4HPg4rCHJDVlQXU1QPJU0yHyNHBgJAUVQPIUtnGHYUVlIUXloN/small"
        variant="red green"
        productPrice={790}
        createBy="Mon A"
        partyDate="2024-03-11T05:58:51.093Z"
        partyExpireDate="2024-03-18T05:58:51.093Z"
        receiverId="65d5b262d2b63ba97f85446d"
        receiverName="ไม้แก่น"
        receiverPicture="https://profile.line-scdn.net/0hAn-QP_AFHkEQKA2rPgFhFixtECxnBhgJaEcFIjZ8FXZuS11DfkhTc2F4SSVoSwxHLx1SIzEpEnI-"
      />
      <div className="bg-[#DFDFDF] h-[8px] " />
      <div className="p-[24px] border-b border-[#DFDFDF] h-[168px]">
        <BillSummary
          giftPrice={1350}
          shippingPrice={50}
          discount={0}
          eachPayment={350}
        />
      </div>
    </div>
  );
};

export default JoinParty;
