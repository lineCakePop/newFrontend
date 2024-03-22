import { SLIPATTACHED, WAITFORSLIP } from "../../utils/const";

import { ReactComponent as Upload } from "../../icons/billSharingParty/upload.svg";
import { ReactComponent as Remove } from "../../icons/billSharingParty/remove.svg";
import { ReactComponent as Clock } from "../../icons/billSharingParty/clock.svg";
import { ReactComponent as Check } from "../../icons/billSharingParty/check.svg";

import ButtonCustom from "../button";

import { useContext, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import { formatDate } from "../../utils/function";
import { AuthContext } from "../../context/AuthContext";

const SlipAttachBlock = ({ paidStatus, paidDate, slipPicture, slipDate }) => {
  const { idToken } = useContext(AuthContext);

  const { partyId } = useParams();

  // ==================== useState ====================

  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [currentPaidstatus, setCurrentPaidStatus] = useState(paidStatus);
  const [currentSlipDate, setCurrentSlipDate] = useState(slipDate);

  // ==================== function ====================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(event.target.files[0]);
        setDisplayImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onClickConfirm = async () => {
    try {
      const formData = new FormData();

      formData.append("slip", selectedImage);
      formData.append("partyId", partyId);
      formData.append("tokenId", idToken);

      const response = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/party/uploadSlip`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setCurrentPaidStatus(SLIPATTACHED);
      setCurrentSlipDate(response.data.slipDate);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border border-[#DFDFDF] rounded p-[16px] h-[168px]">
      {currentPaidstatus === WAITFORSLIP ? (
        <div className="flex flex-col items-center">
          {displayImage ? (
            <div className="self-start relative">
              <div className="h-[72px] w-[72px] flex justify-center items-center overflow-hidden rounded-lg  ">
                <img src={displayImage} className="h-[72px] w-auto" />
              </div>
              <Remove
                className="absolute top-[-7px] right-[-7px]"
                onClick={() => {
                  setSelectedImage(null);
                  setDisplayImage(null);
                }}
              />
            </div>
          ) : (
            <form>
              <label>
                <Upload />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </form>
          )}
          <ButtonCustom
            title="confirm"
            style="w-[100%] h-[49px] rounded-[5px] mt-[16px] bg-[#06C755]"
            onClick={onClickConfirm}
            disable={!selectedImage}
          />
        </div>
      ) : currentPaidstatus === SLIPATTACHED ? (
        <div className="flex flex-col items-center">
          <div className="self-start relative">
            <div className="h-[72px] w-[72px] flex justify-center items-center overflow-hidden rounded-lg  ">
              <img src={slipPicture} className="h-[72px] w-auto" />
            </div>
          </div>

          {/* slip attach */}
          <div className="h-[48px] border w-[100%]  mt-[16px] pt-[8px] flex-col flex items-center">
            <div className="flex">
              <Clock />
              <span className="text-[#949494] font-semibold ml-[4px] text-[14px]">
                Slip Attached
              </span>
            </div>

            <span className="text-[#949494] text-[10px] ">
              {formatDate(currentSlipDate)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="self-start relative">
            <div className="h-[72px] w-[72px] flex justify-center items-center overflow-hidden rounded-lg  ">
              <img src={slipPicture} className="h-[72px] w-auto" />
            </div>
          </div>

          {/* slip Verified*/}
          <div className="h-[48px] border w-[100%]  mt-[16px] pt-[8px] flex-col flex items-center">
            <div className="flex">
              <Check />
              <span className="text-[#949494] font-semibold ml-[4px] text-[14px]">
                Verified
              </span>
            </div>

            <span className="text-[#949494] text-[10px] ">
              {formatDate(paidDate)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlipAttachBlock;
