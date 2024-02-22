import React, { useState } from "react";

import { ConfigProvider, Select } from "antd";

import axios from "axios";

import liff from "@line/liff";

// =============== Image ===============
import { ReactComponent as Cross } from "../../icons/Cross.svg";

// =============== Components ===============
import ButtonCustom from "../../components/Button";
import SwitchCustom from "../../components/Switch";

const AddBirthday = () => {
  const LiffId = process.env.REACT_APP_LIFF_ID;

  // =============== setState ===============
  const [checked, setChecked] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [disable, setDisable] = useState(true);

  // =============== Const ===============

  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const dayOptions = Array.from({ length: 31 }, (_, index) => ({
    value: (index + 1).toString().padStart(2, "0"),
    label: `${index + 1}`,
  }));

  // =============== Axios ===============
  const putChangeBirthday = async () => {
    const birthday = `${year}-${month}-${day}`;
    try {
      await liff.init({
        liffId: LiffId,
        withLoginOnExternalBrowser: true,
      });
      const idToken = await liff.getIDToken();
      const response = await axios.put(
        "https://immensely-delicate-kingfish.ngrok-free.app/user/changeBd",
        {
          id: idToken,
          birthday: birthday,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      // console.log(response)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const putChangeNotify = async () => {
    try {
      await liff.init({
        liffId: LiffId,
        withLoginOnExternalBrowser: true,
      });
      const idToken = await liff.getIDToken();
      const response = await axios.put(
        "https://immensely-delicate-kingfish.ngrok-free.app/user/changeNotify",
        {
          id: idToken,
          notify: checked,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      // console.log(response)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // =============== Handler ===============
  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeMonth = (value) => {
    setMonth(value ? value : "");
    setDisable(handleDisable());
  };

  const handleChangeDay = (value) => {
    setDay(value ? value : "");
    setDisable(handleDisable());
  };

  const handleConfirm = () => {
    putChangeBirthday();
    putChangeNotify();
  };

  const handleDisable = () => {
    console.log("day", day, "month", month);
    if (day !== "" && month !== "") {
      console.log("disable");
      return false;
    }
    return true;
  };

  return (
    <>
      <style>
        {`
                .rc-virtual-list-scrollbar {
                    // padding: 10px 0 !important;
                }
                .rc-virtual-list-scrollbar-thumb {        
                    width: 4px !important;
                    left: 4px !important;
                    background: #C8C8C8 !important;
                }
                .ant-select-dropdown {
                    // padding: 10px 0 !important;
                    box-shadow: none !important;
                    border: 1px solid #DFDFDF !important;
                }
                `}
      </style>
      <div className="flex flex-col justify-between h-[100dvh]">
        <div className="px-[24px] py-[16px]">
          <div className="flex justify-between items-center h-[24px]">
            <div className="font-bold text-[20px] leading-[20px]">
              Add Birthday
            </div>
            <Cross />
          </div>

          <div className="mt-[64px]">
            <div className="flex justify-between">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimaryHover: "#06C755",
                    colorPrimary: "#06C755",
                    borderRadius: 4,
                    // boxShadowSecondary: "",
                    colorText: "#777777",
                    optionSelectedFontWeight: 400,
                    optionHeight: 36,
                  },
                  components: {
                    Select: {
                      optionHeight: 36,
                      optionPadding: 10,
                      optionSelectedBg: "#F5F5F5",
                    },
                  },
                }}
              >
                <Select
                  style={{ width: 191, height: 40 }}
                  allowClear
                  placeholder="Month"
                  options={monthOptions}
                  onChange={handleChangeMonth}
                  listHeight={190}
                />
                <Select
                  style={{ width: 112, height: 40 }}
                  allowClear
                  placeholder="Day"
                  options={dayOptions}
                  onChange={handleChangeDay}
                  listHeight={190}
                />
              </ConfigProvider>
            </div>

            <div className="mt-[32px] h-[26px] flex items-center justify-between">
              <div className="font-bold text-[16px] leading-[20.8px]">
                Notify my birthday
              </div>
              <div>
                <SwitchCustom
                  native={"iOS"}
                  checked={checked}
                  onChange={handleChangeSwitch}
                />
              </div>
            </div>

            <div className="mt-[16px] text-[12px] leading-[15.6px] text-[#555555]">
              If you choose to notify your birthday, we’ll notify your birthday
              to your friends who also added Line Birthday on your birthday and
              7 days before.
            </div>
          </div>
        </div>

        <div className="h-[97px] p-[24px] flex justify-center ">
          <ButtonCustom
            title="Confirm"
            onClick={handleConfirm}
            disable={disable}
          />
        </div>
      </div>
    </>
  );
};

export default AddBirthday;
