import React from "react"

const ModalCustom = ({
    title = <></>,
    subTitle = <></>,
    handleCancel,
    handleConfirm,
}) => {
    return (
        <>
            <div
                style={{ backgroundColor: "rgba(17, 17, 17, 0.5)" }}
                className="justify-center items-center flex  w-[100%] absolute h-[100dvh] z-10"
            >
                <div className="w-[278px] h-[181px] bg-[#FFFFFF] rounded-[20px] px-[24px] pt-[32px] pb-[16px]">
                    {/* title */}
                    <div className="text-[16px] font-bold text-center leading-[20.6px] text-[#111111]">
                        {title}
                    </div>

                    {/* sub title */}
                    <div className="text-[14px] text-[#777777] text-center mt-[8px] leading-[18.2px]">
                        {subTitle}
                    </div>

                    {/* footer */}
                    <div className="mt-[16px] flex justify-between">
                        <div
                            className="w-[111px] h-[49px] flex justify-center items-center"
                            onClick={handleCancel}
                        >
                            <div className="font-bold text-[16px] leading-[20.8px] text-[#000000]">
                                Cancel
                            </div>
                        </div>

                        <div
                            className="w-[111px] h-[49px] flex justify-center items-center"
                            onClick={handleConfirm}
                        >
                            <div className="font-bold text-[16px] leading-[20.8px] text-[#06C755]">
                                Confirm
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCustom
