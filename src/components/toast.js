const ToastCustom = ({ tittle = <></>, icon = <></> }) => {
  return (
    <div className=" absolute top-0 flex justify-center items-center z-10 h-[100dvh] w-[100%]">
      <div className="bg-[#111111D9] flex h-[123px] w-[123px] opacity-85 flex-col items-center gap-[4px] rounded-[5px] justify-center">
        {icon}
        <span className="text-[12px] leading-[15.6px] text-[#FFFFFF]">
          {tittle}
        </span>
      </div>
    </div>
  );
};

export default ToastCustom;
