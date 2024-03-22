import UserIconCustom from "../userIcon";

const JoinPartyCard = ({ name, profile, owner, you }) => {
  return (
    <div className="h-[66px] flex items-center justify-between">
      <div className="flex items-center">
        <UserIconCustom height={50} width={50} img={profile} />
        <span className="ml-[16px] text-[14px] font-semibold">{name}</span>
      </div>
      {owner && !you && (
        <span className="text-[#949494] font-semibold text-[14px]">
          Creator
        </span>
      )}
      {you && (
        <span className="text-[#06C755] font-semibold text-[14px]">You</span>
      )}
    </div>
  );
};

export default JoinPartyCard;
