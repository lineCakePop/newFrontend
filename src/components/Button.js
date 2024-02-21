import React from "react";

const Button = ({
  style = "",
  title = "",
  onClick = () => {},
  type = "normal",
}) => {
  return (
    <>
      {type === "normal" ? (
        <div
          onClick={onClick}
          className={`${
            style === "" ? "w-[327px] h-[49px] rounded-[5px] bg-[#06C755]" : ""
          }  flex justify-center items-center `}
        >
          <span className="text-white font-bold">{title}</span>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Button;
