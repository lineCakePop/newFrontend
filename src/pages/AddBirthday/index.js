import React, { useEffect, useState } from "react"

import { ConfigProvider, Select } from "antd"

import axios from "axios"

import liff from "@line/liff"

// =============== Image ===============
import { ReactComponent as Cross } from "../../icons/Cross.svg"

// =============== Components ===============
import ButtonCustom from "../../components/Button"
import SwitchCustom from "../../components/Switch"
import ModalCustom from "../../components/Modal"

const AddBirthday = () => {
    const idToken =
        "eyJraWQiOiJmYTEzNDA0Mjk5M2E0YTE3MTdlNGVlMTZiMGM0OGYzNTRkZTYxNzFmODUwMTU1OTcxODg1MDM4Mjg4ZmI5MmM5IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVWQ3YmMxNDUxOGZiZjgzMjdmNzFhY2NiNWQ2MDcwNDgwIiwiYXVkIjoiMjAwMzYxOTE2NSIsImV4cCI6MTcwOTAxMDk4OSwiaWF0IjoxNzA5MDA3Mzg5LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoiV2ludGVyIiwicGljdHVyZSI6Imh0dHBzOi8vcHJvZmlsZS5saW5lLXNjZG4ubmV0LzBoV2pWMF9xYzlDRVZyU1IwdDdSbDNFbGNNQmlnY1p3NE5FeTlESlVkT1gzRk9LeHNRQW5oQWRrd2JVblpGTGhzUVVYeEhKUndjVkNBViJ9.jQcsB5JIvibR8Nu0qIC1lCjXjkcABp7Z7PAWrHw8bSWaiex7vw2WOCviko-z6XcTYJNjITCgBBArgG6LyCZAuQ"

    // const LiffId = process.env.REACT_APP_LIFF_ID

    // =============== setState ===============
    const [checked, setChecked] = useState(true)
    const [notify, setNotify] = useState(true)
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState()
    const [day, setDay] = useState()
    const [disable, setDisable] = useState(true)

    const [addBirthday, setAddBirthday] = useState(false)
    const [displayModal, setDisplayModal] = useState(false)
    const [birthdayLabel, setBirthdayLabel] = useState("")

    //   {
    //     "displayName": "Winter",
    //     "pictureUrl": "https://sprofile.line-scdn.net/0hWjV03izdCEV7SR0t7Rl2OgsZCy9YOFFXVytBKklAUn0ULUxGACgSIRxNVXYRLUwVBC9BcRtLAyZ3Wn8jZR_0cXx5VXRHe0wbVSpFpA",
    //     "birthday": "2001-09-05T00:00:00.000Z",
    //     "setBd": true,
    //     "notifyFriend": true
    // }

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
    ]

    const dayOptions = Array.from({ length: 31 }, (_, index) => ({
        value: (index + 1).toString().padStart(2, "0"),
        label: index + 1,
    }))

    // =============== Axios ===============
    const putChangeBirthday = async () => {
        const birthday = `${year}-${month}-${day}`
        try {
            // await liff.init({
            //     liffId: LiffId,
            //     withLoginOnExternalBrowser: true,
            // })
            // const idToken = await liff.getIDToken()
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
            )
            // console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    }

    const putChangeNotify = async () => {
        try {
            // await liff.init({
            //     liffId: LiffId,
            //     withLoginOnExternalBrowser: true,
            // })
            // const idToken = await liff.getIDToken()
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
            )
            // console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    }

    const getMyBd = async () => {
        try {
            // await liff.init({
            //     liffId: LiffId,
            //     withLoginOnExternalBrowser: true,
            // })
            // const idToken = await liff.getIDToken()
            const response = await axios.get(
                "https://immensely-delicate-kingfish.ngrok-free.app/user/myBd",
                {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    },
                    params: {
                        id: idToken,
                    },
                }
            )

            console.log(response.data)

            if (response.data.setBd) {
                setMonth(response.data.birthday.split("-")[1])
                setDay(response.data.birthday.split("-")[2].split("T")[0])
                setNotify(response.data.notifyFriend)
                setChecked(response.data.notifyFriend)
            }
            setAddBirthday(response.data.setBd)
        } catch (error) {
            console.log(error.response)
        }
    }
    // =============== useEffect ===============
    useEffect(() => {
        setDisable(handleDisable())
    }, [month, day, checked])

    useEffect(() => {
        getMyBd()
    }, [])

    // =============== Handler ===============
    const handleChangeSwitch = (event) => {
        setChecked(event.target.checked)
    }

    const handleChangeMonth = (value) => {
        setMonth(value ? value : "")
    }

    const handleChangeDay = (value) => {
        setDay(value ? value : "")
    }

    const handleSave = () => {
        const monthLabel =
            monthOptions.find((option) => option.value === month)?.label || ""

        const dayLabel =
            dayOptions.find((option) => option.value === day)?.label || 0

        setBirthdayLabel(`${monthLabel} ${getOrdinalSuffix(dayLabel)}`)
        setDisplayModal(true)
    }

    const handleDisable = () => {
        if (day && month && !addBirthday) {
            return false
        } else if (addBirthday && notify === checked) {
            return false
        }
        return true
    }

    const handleCancelModal = () => {
        setDisplayModal(false)
    }

    const handleConfirmModal = () => {
        putChangeBirthday()
        putChangeNotify()
    }

    // =============== Function ===============
    const getOrdinalSuffix = (number) => {
        const suffixes = ["th", "st", "nd", "rd"]
        const lastDigit = number % 10
        const suffix =
            lastDigit === 1 && number !== 11
                ? suffixes[1]
                : lastDigit === 2 && number !== 12
                ? suffixes[2]
                : lastDigit === 3 && number !== 13
                ? suffixes[3]
                : suffixes[0]

        return `${number}${suffix}`
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
                                    disabled={addBirthday}
                                />
                                <Select
                                    style={{ width: 112, height: 40 }}
                                    allowClear={false}
                                    placeholder="Day"
                                    options={dayOptions}
                                    onChange={handleChangeDay}
                                    listHeight={190}
                                    value={day}
                                    disabled={addBirthday}
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
                            If you choose to notify your birthday, we’ll notify
                            your birthday to your friends who also added Line
                            Birthday on your birthday and 7 days before.
                        </div>
                    </div>
                </div>

                <div className="h-[97px] p-[24px] flex justify-center border-t border-[#DFDFDF] ">
                    <ButtonCustom
                        title="Save"
                        onClick={handleSave}
                        disable={disable}
                    />
                </div>
            </div>
        </>
    )
}

export default AddBirthday
