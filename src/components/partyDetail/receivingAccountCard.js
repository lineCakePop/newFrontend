import { ReactComponent as Copy } from "../../icons/billSharingParty/copy.svg";
import { ReactComponent as Edit } from "../../icons/billSharingParty/edit.svg";

import { CopyToClipboard } from "react-copy-to-clipboard";

const ReceivingAccountCard = ({
  name,
  accountId,
  edit = false,
  setDisplayToast = null,
}) => {
  return (
    <div className="h-[82px] rounded p-[16px] border border-[#DFDFDF] relative">
      <p className="text-[#2A2A2A] font-semibold text-[14px]">{name}</p>
      <div className="flex text-[14px] text-[#777777] mt-[8px] h-[24px] items-center ">
        <p>PromptPay: {accountId}</p>
        {!edit && (
          <div
            onClick={() => {
              setDisplayToast(true);
              setTimeout(() => {
                setDisplayToast(false);
              }, 1000);
            }}
          >
            <CopyToClipboard text={accountId} className="ml-[11px]">
              <Copy />
            </CopyToClipboard>
          </div>
        )}
      </div>
      {edit && <Edit className="absolute top-[16px] right-[16px]" />}
    </div>
  );
};

export default ReceivingAccountCard;
