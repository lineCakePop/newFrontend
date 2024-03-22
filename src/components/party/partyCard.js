import {
  DELETED,
  DELETED_LABEL,
  EXPIRED,
  EXPIRED_LABEL,
  FINISHED,
  FINISHED_LABEL,
  ONGOING,
  ONGOING_LABEL,
  WAITFORMEMBER,
} from "../../utils/const";

import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrowHead } from "../../icons/ItemInformation/Vector.svg";

const PartyCard = ({
  receiverPicture,
  receiverName,
  partyDate,
  partyStatus,
  productPicture,
  productName,
  total,
  variant,
  memberPicture,
  partyId,
}) => {
  const navigate = useNavigate();

  // date
  function formatAmPm(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = padZero(minutes);
    return `${hours}:${minutes} ${ampm}`;
  }

  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

  const handleDate = () => {
    const date = new Date(partyDate);

    const formattedDate = `${formatAmPm(date)} ${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}/${date.getFullYear()}`;
    return formattedDate;
  };

  // partyStatus
  const handleStatus = () => {
    if (partyStatus === ONGOING || partyStatus === WAITFORMEMBER) {
      return (
        <div className="text-[14px] leading-[18.2px] text-[#FFFFFF] font-semibold bg-[#06C755] px-[8px] py-[4px] rounded-[999px] border-[1.5px] border-[#FFFFFF]">
          {ONGOING_LABEL}
        </div>
      );
    }

    if (partyStatus === FINISHED) {
      return (
        <div className="text-[14px] leading-[18.2px] text-[#FFFFFF] font-semibold bg-[#C8C8C8] px-[8px] py-[4px] rounded-[999px] border-[1.5px] border-[#FFFFFF]">
          {FINISHED_LABEL}
        </div>
      );
    }

    if (partyStatus === DELETED) {
      return (
        <div className="text-[14px] leading-[18.2px] text-[#FFFFFF] font-semibold bg-[#FF334B] px-[8px] py-[4px] rounded-[999px] border-[1.5px] border-[#FFFFFF]">
          {DELETED_LABEL}
        </div>
      );
    }

    if (partyStatus === EXPIRED) {
      return (
        <div className="text-[14px] leading-[18.2px] text-[#FFFFFF] font-semibold bg-[#F6B900] px-[8px] py-[4px] rounded-[999px] border-[1.5px] border-[#FFFFFF]">
          {EXPIRED_LABEL}
        </div>
      );
    }
  };

  const onClickViewDetail = () => {
    navigate(`/bill-sharing-party/${partyId}/false`);
  };

  return (
    <div className="p-[24px] border-b border-[#DFDFDF] flex flex-col gap-[8px]">
      <div className="flex">
        <img
          src={receiverPicture}
          alt="Receiver"
          className="h-[39px] rounded-full"
        />

        <div className="ml-[10px] flex justify-between w-[100%]">
          <div className="flex flex-col justify-between">
            <div className="text-[16px] font-medium leading-[20.8px] flex">
              <div className="font-bold">{receiverName}</div>
              ‘s Gift
            </div>
            <div className="text-[12px] leading-[15.6px] text-[#949494]">
              {handleDate()}
            </div>
          </div>

          <div>{handleStatus()}</div>
        </div>
      </div>

      <div className="py-[16px] flex">
        <img
          src={productPicture}
          alt="Receiver"
          className="h-[64px] rounded-[8px]"
        />

        <div className="ml-[10px] flex flex-col justify-between w-[100%]">
          <div>
            <div className="text-[14px] leading-[18.2px] font-semibold">
              {productName}
            </div>

            <div className="text-[12px] leading-[15.6px] text-[#555555] mt-[4px]">
              {variant}
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="text-[14px] leading-[18.2px] text-[#555555]">
              Total
            </div>
            <div className="text-[12px] leading-[15.6px] font-semibold text-[#555555]">{`฿${
              total
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                .split("$")[1]
            }`}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex">
          {memberPicture.map((picture, index) => {
            return (
              <img
                src={picture}
                alt="Receiver"
                className={`h-[30px] rounded-full border border-[#FFFFFF] ${index ? "ml-[-4px]" : ""}`}
              />
            );
          })}
        </div>

        <div
          className="flex self-end  items-center cursor-pointer"
          onClick={onClickViewDetail}
        >
          <span className="text-[#06C755] mr-[10px] text-[12px]">
            View detail
          </span>
          <ArrowHead />
        </div>
      </div>
    </div>
  );
};

export default PartyCard;
