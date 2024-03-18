import React from "react";

const ButtonCustom = ({
  style = "",
  title = "",
  onClick = () => {},
  type = "normal",
  disable = false,
}) => {
  return (
    <>
      {type === "normal" ? (
        <div
          onClick={disable ? () => {} : onClick}
          className={`${
            style === ""
              ? "w-[327px] h-[49px] rounded-[5px] bg-[#06C755]"
              : style
          } 
                    
                    ${disable ? "bg-[#DFDFDF]" : ""}
                    
                    flex justify-center items-center `}
        >
          <span className="text-white font-bold">{title}</span>
        </div>
      ) : (
        <div
          onClick={disable ? () => {} : onClick}
          className={`${
            style === ""
              ? "w-[327px] h-[49px] rounded-[5px] border border-[#06C755]"
              : style
          } 
                  
                  ${disable ? "bg-[#DFDFDF]" : ""}
                  
                  flex justify-center items-center `}
        >
          <span className="text-[#06C755] font-bold">{title}</span>
        </div>
      )}
    </>
  );
};

export default ButtonCustom;
