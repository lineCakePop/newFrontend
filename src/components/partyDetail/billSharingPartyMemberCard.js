import {
  ONGOING,
  SLIPATTACHED,
  VERIFIED,
  WAITFORMEMBER,
  WAITFORSLIP,
} from "../../utils/const";
import { formatDate } from "../../utils/function";

import UserIconCustom from "../userIcon";
import SlipAttachBlock from "./slipAttachBlock";

import { ReactComponent as Close } from "../../icons/billSharingParty/close.svg";
import { ReactComponent as Open } from "../../icons/billSharingParty/open.svg";
import { useState } from "react";
import MemberVerifyBlock from "./memberVerifyBlock";

const BillSharingPartyMemberCard = ({
  name,
  profile,
  owner,
  you,
  ownerOfParty,
  paidStatus,
  slipPicture,
  paidDate,
  partyStatus,
  slipDate,
  slipId,
}) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [currentPaidStatus, setCurrentPaidStatus] = useState(paidStatus);

  return (
    <>
      <div className=" flex  pt-[8px]">
        <UserIconCustom height={50} width={50} img={profile} />
        {/* right block */}
        <div className="grow ">
          <div className="flex justify-between items-center h-[56px]">
            <p className="ml-[16px] text-[14px] font-semibold">{name}</p>
            {/* owner view */}
            {ownerOfParty ? (
              <>
                {owner ? (
                  <p className="text-[#06C755] font-semibold text-[14px] ">
                    You
                  </p>
                ) : currentPaidStatus === WAITFORSLIP ? (
                  <div
                    className="flex gap-[16px]"
                    onClick={() => {
                      setDisplayDropdown(!displayDropdown);
                    }}
                  >
                    <p className="text-[#949494] text-[14px] font-semibold">
                      Wait for slip
                    </p>
                    {displayDropdown ? <Open /> : <Close />}
                  </div>
                ) : currentPaidStatus === SLIPATTACHED ? (
                  <>
                    <div
                      className="flex gap-[16px]"
                      onClick={() => {
                        setDisplayDropdown(!displayDropdown);
                      }}
                    >
                      <div className="h-[30px]">
                        <p className="text-[#F6B900] text-[14px] font-semibold">
                          Slip attached
                        </p>
                        <p className="text-[10px] text-[#949494]">
                          {formatDate(slipDate)}
                        </p>
                      </div>
                      {displayDropdown ? <Open /> : <Close />}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="flex gap-[16px]"
                      onClick={() => {
                        setDisplayDropdown(!displayDropdown);
                      }}
                    >
                      <div className="h-[30px]">
                        <p className="text-[#06C755] text-[14px] font-semibold">
                          Verified
                        </p>
                        <p className="text-[10px] text-[#949494]">
                          {formatDate(paidDate)}
                        </p>
                      </div>
                      {displayDropdown ? <Open /> : <Close />}
                    </div>
                  </>
                )}
              </>
            ) : (
              // party member view
              <>
                {owner && (
                  <p className="text-[#949494] font-semibold text-[14px]">
                    Creator
                  </p>
                )}
                {you && (
                  <p className="text-[#06C755] font-semibold text-[14px] ">
                    You
                  </p>
                )}

                {!owner && !you && partyStatus === ONGOING && (
                  <>
                    {paidStatus === VERIFIED ? (
                      <div className="h-[30px]">
                        <p className="text-[#06C755] text-[14px] font-semibold">
                          Verified
                        </p>
                        <p className="text-[10px] text-[#949494]">
                          {formatDate(paidDate)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[#949494] font-semibold text-[14px]">
                        Unpaid
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {displayDropdown && (
            <MemberVerifyBlock
              paidStatus={currentPaidStatus}
              setCurrentPaidStatus={setCurrentPaidStatus}
              slipPicture={slipPicture}
              slipId={slipId}
            />
          )}

          {you && partyStatus === ONGOING && (
            <SlipAttachBlock
              paidStatus={paidStatus}
              paidDate={paidDate}
              slipPicture={slipPicture}
              slipDate={slipDate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BillSharingPartyMemberCard;
