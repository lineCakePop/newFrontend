import UserIconCustom from "../userIcon";

const JoinPartyCard = ({ name, profile, owner }) => {
  return (
    <div className="h-[66px] flex items-center justify-between">
      <div className="flex items-center">
        <UserIconCustom height={50} width={50} img={profile} />
        <span className="ml-[16px] text-[14px] font-semibold">{name}</span>
      </div>
      {owner && (
        <span className="text-[#949494] font-semibold text-[14px]">
          Creator
        </span>
      )}
    </div>
  );
};

export default JoinPartyCard;
