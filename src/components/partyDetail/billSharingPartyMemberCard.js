import { VERIFIED } from "../../utils/const";
import UserIconCustom from "../userIcon";

const BillSharingPartyMemberCard = ({
  name,
  profile,
  owner,
  you,
  ownerOfParty,
  paidStatus,
  slipPicture,
  paidDate,
}) => {
  return (
    <div className="h-[66px] flex items-center justify-between">
      <div className="flex items-center">
        <UserIconCustom height={50} width={50} img={profile} />
        <span className="ml-[16px] text-[14px] font-semibold">{name}</span>
      </div>
      {ownerOfParty ? (
        <>
          {owner && !you && (
            <span className="text-[#949494] font-semibold text-[14px]">
              Creator
            </span>
          )}
          {you && (
            <span className="text-[#949494] font-semibold text-[14px]">
              You
            </span>
          )}
        </>
      ) : (
        <>
          {owner && !you && (
            <span className="text-[#949494] font-semibold text-[14px]">
              Creator
            </span>
          )}
          {you && (
            <span className="text-[#949494] font-semibold text-[14px]">
              You
              {/* and slip upload block */}
            </span>
          )}
          {!owner && !you && (
            <>
              {paidStatus === VERIFIED ? (
                <div></div>
              ) : (
                <span className="text-[#949494] font-semibold text-[14px]">
                  Unpaid
                </span>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BillSharingPartyMemberCard;
