import { DELETED, EXPIRED, FINISHED } from "../../utils/const";
import { formatDate } from "../../utils/function";

const StatusTag = ({ partyStatus, date }) => {
  if (partyStatus === FINISHED) {
    return (
      <div className="mt-[16px] h-[37px] flex justify-between items-center px-[16px] rounded bg-[#F5F5F5]">
        <div className="text-[16px] font-bold text-[#949494]">Finished</div>
        <div className="text-[#949494] text-[14px]">
          {formatDate(date).slice(3)}
        </div>
      </div>
    );
  }

  if (partyStatus === DELETED) {
    return (
      <div className="mt-[16px] h-[37px] flex justify-between items-center px-[16px] rounded bg-[#FF334B1A]">
        <div className="text-[16px] font-bold text-[#FF334B]">Deleted</div>
        <div className="text-[#949494] text-[14px]">
          {formatDate(date).slice(3)}
        </div>
      </div>
    );
  }

  if (partyStatus === EXPIRED) {
    return (
      <div className="mt-[16px] h-[37px] flex justify-between items-center px-[16px] rounded bg-[#F6B9001A]">
        <div className="text-[16px] font-bold text-[#F6B900]">Expired</div>
        <div className="text-[#949494] text-[14px]">
          {formatDate(date).slice(3)}
        </div>
      </div>
    );
  }

  return <></>;
};

export default StatusTag;
