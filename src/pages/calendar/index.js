import React, { useEffect, useState } from "react";

// icons
import { ReactComponent as PrevMonth } from "../../icons/calendar/prevMonth.svg";
import { ReactComponent as NextMonth } from "../../icons/calendar/nextMonth.svg";
import { ReactComponent as Heart } from "../../icons/calendar/heart.svg";
import { ReactComponent as Birthday } from "../../icons/calendar/birthday-cake-solid.svg";
import { ReactComponent as Wishlist } from "../../icons/calendar/wishlist.svg";

const Calendar = () => {
    const [current, setCurrent] = useState(new Date());

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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const [calendar, setCalendar] = useState([[]]);
    const [targetDate, setTargetDate] = useState(current);

    // path="/wishlist-detail/:userId"

    // =============== useEffect ===============
    useEffect(() => {
        createCalendar();
    }, [current]);

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
            if (startDate.getMonth() > current.getMonth()) {
                break;
            }
        }
        setCalendar(month);
    };

    // =============== function ===============
    const isToday = (inputDate) => {
        const today = new Date();

        return (
            inputDate.getDate() === today.getDate() &&
            inputDate.getMonth() === today.getMonth() &&
            inputDate.getFullYear() === today.getFullYear()
        );
    };

    const isSameDay = (inputDate1, inputDate2) => {
        return (
            inputDate1.getDate() === inputDate2.getDate() &&
            inputDate1.getMonth() === inputDate2.getMonth() &&
            inputDate1.getFullYear() === inputDate2.getFullYear()
        );
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

    const handleWishlist = () => {};

    const mock = [[], []];

    return (
        <div>
            {/* title */}
            <div className="h-[56px] mb-[16px] justify-center items-center flex">
                <div className="font-bold text-[20px] leading-[20px] text-[#000000]">
                    Calendar
                </div>
            </div>

            {/* calendar */}
            <div className="border-y  border-[#DFDFDF] py-[32px] flex flex-col items-center">
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
                                                            : "bg-[#DFDFDF]"
                                                        : ""
                                                } w-[48px] h-[48px] border-r border-[#F5F5F5] relative  flex justify-center items-center text-[14px] leading-[18.2px]`}
                                                onClick={() => {
                                                    if (
                                                        date.getMonth() ===
                                                        current.getMonth()
                                                    ) {
                                                        handleSelectedDate(
                                                            date
                                                        );
                                                    }
                                                }}
                                            >
                                                {day}

                                                {/* {day === current.getDate() && (
                                                    <div className="bg-[#06C755] rounded-full w-[6px] h-[6px] absolute top-[7px] left-[21px]"></div>
                                                )} */}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-[32px] p-[24px] text-[#111111]">
                <div className="text-[16px] leading-[20.8px] font-medium">
                    {isToday(targetDate)
                        ? "Today"
                        : `${targetDate.getDate()} ${
                              monthsFullName[targetDate.getMonth()]
                          } ${targetDate.getFullYear()}`}
                </div>

                <div className="mt-[24px]">
                    <div className="flex gap-[8px] items-end">
                        <Birthday />
                        <div className="text-[14px] font-semibold leading-[18.2px]">
                            Birthday
                        </div>
                    </div>

                    <div className="mt-[4px] ">
                        {mock.map((profile) => {
                            const name = "MonA";
                            return (
                                <div className="mt-[12px] flex justify-between">
                                    <div className="flex gap-[16px] items-center">
                                        <div className="bg-black w-[36px] h-[36px] rounded-full">
                                            {/* <img
                                            src={pictureUrl}
                                            className="w-[36px]"
                                        /> */}
                                        </div>
                                        <div className="text-[12px] leading-[15.6px] font-semibold">
                                            {name}
                                        </div>
                                    </div>

                                    <Wishlist
                                        onClick={() => {
                                            handleWishlist();
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Calendar;
