import { SLIPATTACHED, VERIFIED, WAITFORSLIP } from "../../utils/const";

import { ReactComponent as Check } from "../../icons/billSharingParty/check.svg";
import { ReactComponent as CheckVerify } from "../../icons/billSharingParty/checkVerify.svg";

import { useContext, useState } from "react";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const MemberVerifyBlock = ({
  setPartyMember,
  id,
  paidStatus,
  slipPicture,
  slipId,
  setCurrentPaidStatus,
  setCurrentPaidDate,
}) => {
  const { idToken } = useContext(AuthContext);

  const verifySlip = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/party/verifySlip`,
        {
          tokenId: idToken,
          slipId: slipId,
        },
      );
      setCurrentPaidDate(response.data.paidDate);
      setCurrentPaidStatus(VERIFIED);
      setPartyMember((member) =>
        member.map((user) => {
          if (user.id === id) {
            user.paidStatus = VERIFIED;
          }
          return user;
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border border-[#DFDFDF] rounded h-[154px] p-[16px]">
      {paidStatus === WAITFORSLIP ? (
        <>
          <div className="h-[72px] border border-[#DFDFDF] rounded border-dashed flex justify-center items-center">
            <span className="text-[#C8C8C8] text-[12px]">No slip attached</span>
          </div>
          {/* button */}
          <div
            onClick={verifySlip}
            className="mt-[16px] border h-[34px] flex justify-center
           items-center border-[#DFDFDF] gap-[4px]"
          >
            <Check />
            <span className="text-[14px] font-semibold text-[#111111]">
              Paid By Cash
            </span>
          </div>
        </>
      ) : paidStatus === SLIPATTACHED ? (
        <>
          <div className="h-[72px] w-[72px] flex justify-center items-center rounded-lg overflow-hidden">
            {slipPicture && <img src={slipPicture} className="h-[72px]" />}
          </div>
          <div
            onClick={verifySlip}
            className="mt-[16px] border h-[34px] flex justify-center
       items-center border-[#DFDFDF] gap-[4px]"
          >
            <Check />
            <span className="text-[14px] font-semibold text-[#111111]">
              Verify
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="h-[72px] w-[72px] flex justify-center items-center rounded-lg overflow-hidden ">
            <img src={slipPicture} className="h-[72px] " />
          </div>
          <div
            className="mt-[16px] border h-[34px] flex justify-center
     items-center border-[#DFDFDF] gap-[4px]"
          >
            <CheckVerify />
            <span className="text-[14px] font-semibold text-[#DFDFDF]">
              Verify
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberVerifyBlock;
