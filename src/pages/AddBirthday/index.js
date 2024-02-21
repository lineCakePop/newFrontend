import React, { useState } from "react"
import { ReactComponent as Cross } from "../../icons/Cross.svg"
import Button from "../../components/Button"
import SwitchCustom from "../../components/Switch"
import ScrollPicker from "../../components/ScrollPicker"

import Switch from "@mui/material/Switch"
import { styled } from "@mui/material/styles"

const AddBirthday = () => {
    const [checked, setChecked] = React.useState(true)

    const handleChange = (event) => {
        setChecked(event.target.checked)
    }

    const IOSSwitch = styled((props) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
            checked={checked}
            onChange={handleChange}
        />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                    opacity: 1,
                    border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: "#33cf4d",
                border: "6px solid #fff",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
                color:
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 22,
            height: 22,
        },
        "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor:
                theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
            opacity: 1,
            transition: theme.transitions.create(["background-color"], {
                duration: 500,
            }),
        },
    }))

    return (
        <div className="flex flex-col justify-between h-[100vh]">
            <div className="px-[24px] py-[16px]">
                <div className="flex justify-between items-center h-[24px]">
                    <div className="font-bold text-[20px] leading-[20px]">
                        Add Birthday
                    </div>
                    <Cross />
                </div>

                <div className="mt-[64px]">
                    <div className="text-[#777777] font-medium text-[18px]">
                        Choose date
                    </div>

                    <div className="mt-[32px] h-[26px] flex items-center justify-between">
                        <div className="font-bold text-[16px] leading-[20.8px]">
                            Notify my birthday
                        </div>
                        <div>
                            <IOSSwitch />
                        </div>
                    </div>

                    <div className="mt-[16px] text-[12px] leading-[15.6px] text-[#555555]">
                        If you choose to notify your birthday, we’ll notify your
                        birthday to your friends who also added Line Birthday on
                        your birthday and 7 days before.
                    </div>

                    <ScrollPicker />
                </div>
            </div>

            <div className="h-[97px] p-[24px] ">
                <Button title="Confirm" />
            </div>
        </div>
    )
}

export default AddBirthday
