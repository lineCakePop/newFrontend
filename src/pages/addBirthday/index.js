import React, { useEffect, useState, useContext } from "react";

import { ConfigProvider, Select } from "antd";

import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import liff from "@line/liff";

// =============== Components ===============
import ButtonCustom from "../../components/button";
import SwitchCustom from "../../components/switch";
import ModalCustom from "../../components/modal";
import { LOADING, SUCCESS } from "../../utils/const";
import Loading from "../Loading";

const AddBirthday = () => {
  const { idToken } = useContext(AuthContext);

  // =============== setState ===============
  const [checked, setChecked] = useState(true);
  const [notify, setNotify] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [disable, setDisable] = useState(true);
  const [alreadyAddBirthday, setAlreadyAddBirthday] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [birthdayLabel, setBirthdayLabel] = useState("");
  const [statusPage, setStatusPage] = useState(LOADING);

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
    label: index + 1,
  }));

  // =============== Axios ===============
  const putChangeBirthday = async () => {
    const birthday = `${year}-${month}-${day}`;
    try {
      liff.closeWindow();
      setAlreadyAddBirthday(true);
      setDisplayModal(false);
      await axios.put(`${process.env.REACT_APP_API_PROXY}/user/changeBd`, {
        id: idToken,
        birthday: birthday,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const putChangeNotify = async () => {
    try {
      liff.closeWindow();
      await axios.put(`${process.env.REACT_APP_API_PROXY}/user/changeNotify`, {
        id: idToken,
        notify: checked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMyBd = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/user/myBd`,
        {
          params: {
            id: idToken,
          },
        },
      );

      if (response.data.setBd) {
        setMonth(response.data.birthday.split("-")[1]);
        setDay(response.data.birthday.split("-")[2].split("T")[0]);
        setNotify(response.data.notifyFriend);
        setChecked(response.data.notifyFriend);
      }
      setAlreadyAddBirthday(response.data.setBd);

      setStatusPage(SUCCESS);
    } catch (error) {
      console.log(error);
    }
  };

  // =============== useEffect ===============
  useEffect(() => {
    setDisable(handleDisable());
  }, [month, day, checked, notify, alreadyAddBirthday]);

  useEffect(() => {
    if (idToken !== "") {
      getMyBd();
    }
  }, [idToken]);

  // =============== Handler ===============
  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeMonth = (value) => {
    setMonth(value ? value : "");
  };

  const handleChangeDay = (value) => {
    setDay(value ? value : "");
  };

  const handleSave = () => {
    if (alreadyAddBirthday) {
      setNotify(checked);
      putChangeNotify();
    } else {
      const monthLabel =
        monthOptions.find((option) => option.value === month)?.label || "";

      const dayLabel =
        dayOptions.find((option) => option.value === day)?.label || 0;

      setBirthdayLabel(`${monthLabel} ${getOrdinalSuffix(dayLabel)}`);
      setDisplayModal(true);
    }
  };

  const handleDisable = () => {
    if (day && month && !alreadyAddBirthday) {
      return false;
    } else if (alreadyAddBirthday && notify !== checked) {
      return false;
    }
    return true;
  };

  const handleCancelModal = () => {
    setDisplayModal(false);
  };

  const handleConfirmModal = () => {
    putChangeBirthday();
    putChangeNotify();
  };

  // =============== Function ===============
  const getOrdinalSuffix = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = number % 10;
    const suffix =
      lastDigit === 1 && number !== 11
        ? suffixes[1]
        : lastDigit === 2 && number !== 12
          ? suffixes[2]
          : lastDigit === 3 && number !== 13
            ? suffixes[3]
            : suffixes[0];

    return `${number}${suffix}`;
  };

  if (statusPage === LOADING) {
    return (
      <>
        <Loading />
      </>
    );
  }

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

      {displayModal && (
        <ModalCustom
          title={
            <div>
              Your birthday is on
              <br />“{birthdayLabel}”
            </div>
          }
          subTitle={<>You cannot change the date later.</>}
          handleCancel={handleCancelModal}
          handleConfirm={handleConfirmModal}
        />
      )}

      <div className="flex flex-col justify-between h-[100dvh]">
        <div className="px-[24px] py-[16px]">
          <div className="flex justify-between items-center h-[24px]">
            <div className="font-bold text-[20px] leading-[20px]">
              Add Birthday
            </div>
            {/* <Cross /> */}
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
                  allowClear={false}
                  placeholder="Month"
                  options={monthOptions}
                  onChange={handleChangeMonth}
                  listHeight={190}
                  value={month}
                  disabled={alreadyAddBirthday}
                />
                <Select
                  style={{ width: 112, height: 40 }}
                  allowClear={false}
                  placeholder="Day"
                  options={dayOptions}
                  onChange={handleChangeDay}
                  listHeight={190}
                  value={day}
                  disabled={alreadyAddBirthday}
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
              to your friends who also added "Line Birthday" on your birthday.
            </div>
          </div>
        </div>

        <div className="h-[97px] p-[24px] flex justify-center border-t border-[#DFDFDF] ">
          <ButtonCustom title="Save" onClick={handleSave} disable={disable} />
        </div>
      </div>
    </>
  );
};

export default AddBirthday;
