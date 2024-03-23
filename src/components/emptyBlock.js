import { ReactComponent as EmptyBlock } from "../icons/emptyBlock.svg";

const EmptyBlockCustom = ({ title, subTitle, showSubTitle = true }) => {
  return (
    <div className="grow flex flex-col justify-center items-center">
      <EmptyBlock />
      <p className="mt-[8px] font-bold text-[#949494] text-[18px]">{title}</p>
      {showSubTitle && <p className="text-[#949494] text-[14px]">{subTitle}</p>}
    </div>
  );
};

export default EmptyBlockCustom;
