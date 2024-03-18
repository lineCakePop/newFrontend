import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

// =============== Components ===============
import ButtonCustom from "../../components/button";
import SwitchCustom from "../../components/switch";

import { LOADING, SUCCESS } from "../../utils/const";
import Loading from "../Loading";

const Setting = () => {
  const { idToken } = useContext(AuthContext);

  // =============== setState ===============
  const [checked, setChecked] = useState(true);
  const [notify, setNotify] = useState(true);

  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  const [disable, setDisable] = useState(true);

  const [status, setStatus] = useState(LOADING);

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
        const monthLabel = monthOptions.find(
          (item) => item.value === response.data.birthday.split("-")[1],
        ).label;

        const dayLabel = dayOptions.find(
          (item) =>
            item.value === response.data.birthday.split("-")[2].split("T")[0],
        ).label;
        setMonth(monthLabel);
        setDay(dayLabel);
        setNotify(response.data.notifyFriend);
      }
      setStatus(SUCCESS);
    } catch (error) {
      console.log(error);
    }
  };

  const putChangeNotify = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_PROXY}/user/changeNotify`, {
        id: idToken,
        notify: checked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // =============== useEffect ===============
  useEffect(() => {
    if (idToken !== "") {
      getMyBd();
    }
  }, [idToken]);

  useEffect(() => {
    setDisable(handleDisable());
  }, [checked, notify]);

  // =============== Handler ===============
  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleSave = () => {
    setNotify(checked);
    putChangeNotify();
  };

  const handleDisable = () => {
    if (notify !== checked) {
      return false;
    }
    return true;
  };

  if (status === LOADING) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-between h-[100dvh] px-[24px] py-[16px] ">
        <div>
          {/* Birthday */}
          <div>
            <div className="font-bold text-[16px] leading-[20.8px]">
              My Birthday
            </div>

            <div className="font-medium text-[24px] leading-[24px] text-[#949494] mt-[16px]">
              {month}, {day}
            </div>
          </div>

          {/* Notify */}
          <div className="mt-[32px]">
            <div className="flex justify-between items-center">
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
      </div>

      <div className="h-[97px] p-[24px] flex justify-center border-t border-[#DFDFDF] ">
        <ButtonCustom title="Save" onClick={handleSave} disable={disable} />
      </div>
    </>
  );
};

export default Setting;
