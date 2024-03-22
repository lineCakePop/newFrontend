import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// icons
import { ReactComponent as PrevMonth } from "../../icons/calendar/prevMonth.svg";
import { ReactComponent as NextMonth } from "../../icons/calendar/nextMonth.svg";
import { ReactComponent as Birthday } from "../../icons/calendar/birthday-cake-solid.svg";
import { ReactComponent as Wishlist } from "../../icons/calendar/wishlist.svg";
import { ReactComponent as Children } from "../../icons/calendar/holliday/children.svg";
import { ReactComponent as Chinese } from "../../icons/calendar/holliday/chinese.svg";
import { ReactComponent as Chrismas } from "../../icons/calendar/holliday/chrismas.svg";
import { ReactComponent as Father } from "../../icons/calendar/holliday/father.svg";
import { ReactComponent as Halloween } from "../../icons/calendar/holliday/halloween.svg";
import { ReactComponent as Mother } from "../../icons/calendar/holliday/mother.svg";
import { ReactComponent as Newyear } from "../../icons/calendar/holliday/newyear.svg";
import { ReactComponent as Valentine } from "../../icons/calendar/holliday/valentine.svg";
import { ReactComponent as Teacher } from "../../icons/calendar/holliday/teacher.svg";
import { ReactComponent as Click } from "../../icons/calendar/hand-pointer-solid.svg";
import { ReactComponent as Empty } from "../../icons/calendar/border-style-solid.svg";
import loadingGif from "../../icons/cakeGif.gif";

import { LOADING, SUCCESS } from "../../utils/const";

import { AuthContext } from "../../context/AuthContext";

const Calendar = () => {
  const { idToken } = useContext(AuthContext);

  const navigate = useNavigate();

  // =============== Const ===============
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthsFullName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const hollidayItem = [
    { img: <Children />, name: "Children’s Day" },
    { img: <Chinese />, name: "Chinese New Year’s Day" },
    { img: <Chrismas />, name: "Christmas Day" },
    { img: <Father />, name: "Father’s Day" },
    { img: <Halloween />, name: "Halloween Day" },
    { img: <Mother />, name: "Mother’s Day" },
    { img: <Newyear />, name: "New Year’s Day" },
    { img: <Teacher />, name: "Teacher’s Day" },
    { img: <Valentine />, name: "Valentine’s Day" },
  ];

  // =============== setState ===============
  const [status, setStatus] = useState(LOADING);

  const [calendar, setCalendar] = useState([[]]);

  const [current, setCurrent] = useState(new Date());
  const [targetDate, setTargetDate] = useState(current);

  //   event
  const [birthday, setBirthday] = useState([]);
  const [myBirthday, setMyBirthday] = useState([]);
  const [hollidays, setHollidays] = useState([]);

  const [eventCurrentMonth, setEventCurrentMonth] = useState([]);

  // =============== useEffect ===============
  useEffect(() => {
    createCalendar();
    handleEventInMonth();
    if (current.getMonth() === 11 || current.getMonth() === 5) {
      getEventCalendar();
    }
    setTargetDate();
  }, [current]);

  useEffect(() => {
    if (idToken !== "") {
      getEventCalendar();
      setTargetDate(current);
    }
  }, [idToken]);

  // =============== Axios ===============
  const getEventCalendar = async () => {
    let year = current.getFullYear();

    if (current.getMonth() === 11) {
      year = current.getFullYear() + 1;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROXY}/calendar/events`,
        {
          params: {
            id: idToken,
            year: year,
          },
        },
      );

      setBirthday(response.data.bd);
      setHollidays(response.data.other);
      setMyBirthday(response.data.myBd);

      setStatus(SUCCESS);
    } catch (error) {
      console.log(error);
    }
  };

  // =============== function ===============
  //   create current month event
  const handleEventInMonth = async () => {
    const month = current.getMonth() + 1;

    const eventMonth = [];

    if (myBirthday.month === month) {
      eventMonth.push({
        date: myBirthday.date,
        month: myBirthday.month,
        birthday: {
          displayName: myBirthday.displayName,
          pictureUrl: myBirthday.pictureUrl,
          userId: myBirthday.userId,
        },
        seasonName: null,
      });
    }

    birthday.forEach((profile) => {
      if (profile.month === month) {
        eventMonth.push({
          date: profile.date,
          month: profile.month,
          birthday: {
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            userId: profile.userId,
          },
          seasonName: null,
        });
      }
    });

    hollidays.forEach((holliday) => {
      if (holliday.month === month) {
        eventMonth.push({
          date: holliday.date,
          month: holliday.month,
          birthday: null,
          seasonName: holliday.seasonName,
        });
      }
    });

    eventMonth.sort((a, b) => a.date - b.date);

    setEventCurrentMonth(eventMonth);
    // console.log("eventMonth", eventMonth);
  };

  //   create calendar
  const createCalendar = () => {
    let month = [];

    let startDate = new Date(current.getFullYear(), current.getMonth(), 1);

    startDate.setDate(1 - startDate.getDay());

    for (let week = 0; week <= 5; week++) {
      let week = [];

      for (let day = 0; day <= 6; day++) {
        week.push(new Date(startDate));

        startDate.setDate(startDate.getDate() + 1);
      }
      month.push(week);

      if (
        startDate.getMonth() > current.getMonth() ||
        startDate.getFullYear() > current.getFullYear()
      ) {
        break;
      }
    }
    setCalendar(month);
  };

  const isToday = (inputDate) => {
    const today = new Date();
    if (inputDate) {
      return (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
      );
    }
  };

  const isSameDay = (inputDate1, inputDate2) => {
    if (inputDate1 && inputDate2) {
      return (
        inputDate1.getDate() === inputDate2.getDate() &&
        inputDate1.getMonth() === inputDate2.getMonth() &&
        inputDate1.getFullYear() === inputDate2.getFullYear()
      );
    }
  };

  // =============== handler ===============
  const incrementMonth = () => {
    const nextMonth = new Date(current);
    nextMonth.setMonth(current.getMonth() + 1);
    setCurrent(nextMonth);
  };

  const decrementMonth = () => {
    const prevMonth = new Date(current);
    prevMonth.setMonth(current.getMonth() - 1);
    setCurrent(prevMonth);
  };

  const handleSelectedDate = (date) => {
    setTargetDate(date);
  };

  const handleWishlist = (userId) => {
    navigate(`/wishlist-detail/${userId}`);
  };

  // =============== renderer ===============
  const renderBirthday = () => {
    return (
      <>
        {eventCurrentMonth.map((profile, index) => {
          if (
            targetDate &&
            targetDate.getDate() === profile.date &&
            profile.birthday
          ) {
            const pictureUrl = profile.birthday.pictureUrl;
            const userId = profile.birthday.userId;
            const displayName =
              userId === myBirthday.userId
                ? "Me"
                : profile.birthday.displayName;
            return (
              <div key={index}>
                {index === 0 && (
                  <div className="flex items-end mt-[24px]">
                    <Birthday />
                    <div className="text-[14px] ml-[8px] font-semibold leading-[18.2px]">
                      Birthday
                    </div>
                  </div>
                )}
                <div
                  className={`${index === 0 ? "mt-[16px]" : "mt-[12px]"} flex justify-between`}
                >
                  <div className="flex gap-[16px] items-center">
                    <div className=" w-[36px] h-[36px]">
                      <img
                        src={pictureUrl}
                        className="w-[36px] rounded-full"
                        alt={"profile"}
                      />
                    </div>
                    <div className="text-[12px] leading-[15.6px] font-semibold">
                      {displayName}
                    </div>
                  </div>

                  {userId !== myBirthday.userId && (
                    <Wishlist
                      onClick={() => {
                        handleWishlist(userId);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          }
          return <div key={index}></div>;
        })}
      </>
    );
  };

  const renderHolliday = () => {
    return (
      <>
        {eventCurrentMonth.map((profile, index) => {
          if (
            targetDate &&
            targetDate.getDate() === profile.date &&
            profile.seasonName
          ) {
            const seasonName = profile.seasonName.replace(/'/g, "’");

            const icon = hollidayItem.find(
              (item) => item.name === seasonName,
            )?.img;

            return (
              <div key={index}>
                <div className="flex items-end mt-[24px]">
                  {icon}
                  <div className="text-[14px] ml-[8px] font-semibold leading-[18.2px]">
                    {seasonName}
                  </div>
                </div>
              </div>
            );
          }
          return <div key={index}></div>;
        })}
      </>
    );
  };

  const renderEventMonth = () => {
    if (eventCurrentMonth.length) {
      return (
        <div>
          {eventCurrentMonth.map((event, index) => {
            const date = event.date;
            const month = monthsFullName[current.getMonth()];
            const year = current.getFullYear();

            let sameDay = false;
            if (index) {
              sameDay =
                eventCurrentMonth[index].date ===
                eventCurrentMonth[index - 1].date;
            }

            if (event.seasonName) {
              const seasonName = event.seasonName.replace(/'/g, "’");
              const icon = hollidayItem.find(
                (item) => item.name === seasonName,
              )?.img;
              return (
                <div
                  key={index}
                  className={`${index ? (sameDay ? "" : "mt-[24px] pt-[24px] border-t  border-[#DFDFDF]") : ""}`}
                >
                  {!sameDay && (
                    <div className="text-[16px] leading-[20.8px] font-medium">
                      {`${date} ${month} ${year}`}
                    </div>
                  )}

                  <div className="flex items-end mt-[16px]">
                    {icon}
                    <div className="text-[14px] ml-[8px] font-semibold leading-[18.2px]">
                      {seasonName}
                    </div>
                  </div>
                </div>
              );
            }
            const pictureUrl = event.birthday.pictureUrl;
            const userId = event.birthday.userId;
            const displayName =
              userId === myBirthday.userId ? "Me" : event.birthday.displayName;
            return (
              <div
                key={index}
                className={`${index ? (sameDay ? "" : "mt-[24px] pt-[24px] border-t  border-[#DFDFDF]") : ""}`}
              >
                {!sameDay && (
                  <>
                    <div className="text-[16px] leading-[20.8px] font-medium">
                      {`${date} ${month} ${year}`}
                    </div>

                    <div className="flex items-end mt-[16px]">
                      <Birthday />
                      <div className="text-[14px] ml-[8px] font-semibold leading-[18.2px]">
                        Birthday
                      </div>
                    </div>
                  </>
                )}

                <div
                  className={`${!sameDay ? "mt-[16px]" : "mt-[12px]"} flex justify-between`}
                >
                  <div className="flex gap-[16px] items-center">
                    <div className=" w-[36px] h-[36px]">
                      <img
                        src={pictureUrl}
                        className="w-[36px] rounded-full"
                        alt={"profile"}
                      />
                    </div>
                    <div className="text-[12px] leading-[15.6px] font-semibold">
                      {displayName}
                    </div>
                  </div>

                  {userId !== myBirthday.userId && (
                    <Wishlist
                      onClick={() => {
                        handleWishlist(userId);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex items-center flex-col ">
        <Empty />
        <div className="text-[16px] mt-[6px] text-center leading-[20.8px] font-medium text-[#949494]">
          No upcoming event <br /> in this month
        </div>
      </div>
    );
  };

  if (status === LOADING)
    return (
      <div className="grow flex justify-center items-center">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return (
    <div className="bg-white h-[100dvh] overflow-scroll flex flex-col">
      {/* calendar */}
      <div className="py-[24px] flex flex-col items-center  ">
        {/* header */}
        <div className="flex w-[100%] px-[24px] mb-[16px] h-[24px] justify-between items-center">
          <PrevMonth onClick={decrementMonth} />
          <div className="font-bold text-[16px] leading-[20.8px] text-[#000000]">
            {months[current.getMonth()]} {current.getFullYear()}
          </div>
          <NextMonth onClick={incrementMonth} />
        </div>

        <div>
          <div className="flex">
            {weekdays.map((day) => {
              return (
                <div
                  key={day}
                  className="w-[48px] h-[48px] flex justify-center items-center text-[12px] leading-[15.6px] font-semibold text-[#000000] "
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="border-t border-l border-[#F5F5F5]">
            {calendar.map((week) => {
              return (
                <div
                  className="flex border-b border-[#F5F5F5]"
                  key={current.getMonth() + week}
                >
                  {week.map((date) => {
                    const day = date.getDate();
                    const month = date.getMonth();

                    const isEvent = eventCurrentMonth.some(
                      (event) =>
                        event.date === day && event.month === month + 1,
                    );

                    return (
                      <div
                        key={day}
                        className={`${
                          month !== current.getMonth()
                            ? "bg-[#F5F5F5] text-[#C8C8C8]"
                            : "text-[#000000]"
                        } ${
                          isToday(date)
                            ? "bg-[#06C755] text-[#FFFFFF]"
                            : "text-[#000000]"
                        } ${
                          isSameDay(date, targetDate)
                            ? isToday(date)
                              ? "bg-[#06C755] text-[#FFFFFF]"
                              : "bg-[#DFDFDF] text-[#000000]"
                            : ""
                        } w-[48px] h-[48px] border-r border-[#F5F5F5] relative  flex justify-center items-center text-[14px] leading-[18.2px]`}
                        onClick={() => {
                          if (date.getMonth() === current.getMonth()) {
                            handleSelectedDate(date);
                          }
                        }}
                      >
                        {day}
                        {isEvent && (
                          <div className="bg-[#06C755] rounded-full w-[6px] h-[6px] absolute top-[7px] left-[21px]"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* display Event */}
      <div className="border-t border-[#DFDFDF]  p-[24px] text-[#111111] flex-grow">
        {targetDate ? (
          <>
            <div className="text-[16px] leading-[20.8px] font-medium">
              {isToday(targetDate)
                ? "Today"
                : `${targetDate.getDate()} ${
                    monthsFullName[targetDate.getMonth()]
                  } ${targetDate.getFullYear()}`}
            </div>
            {eventCurrentMonth.some(
              (event) => event.date === targetDate.getDate(),
            ) ? (
              <div className="">
                <div>{renderBirthday()}</div>
                <div>{renderHolliday()}</div>
              </div>
            ) : (
              <div className="flex items-center flex-col mt-[24px]">
                <Empty />
                <div className="text-[16px] mt-[6px] text-center leading-[20.8px] font-medium text-[#949494]">
                  No upcoming event <br /> in this day
                </div>
              </div>
            )}
          </>
        ) : (
          // <div className="flex items-center flex-col justify-center h-[100%]">
          //   <Click />
          //   <div className="text-[16px] mt-[6px] leading-[20.8px] font-medium text-[#949494]">
          //     Click on date
          //   </div>
          //   <div className="text-[16px] leading-[20.8px] font-medium text-[#949494]">
          //     to see the event
          //   </div>
          // </div>
          <>{renderEventMonth()}</>
        )}
      </div>
    </div>
  );
};
export default Calendar;
