import {
    FormControl,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
} from "@mui/material"
import React from "react"

// import FormControl from "@material-ui/core/FormControl"
// import InputLabel from "@material-ui/core/InputLabel"
// import Select from "@material-ui/core/Select"
// import MenuItem from "@material-ui/core/MenuItem"
const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
]
const ScrollPicker = () => {
    const value = null
    const onChange = (e) => console.log(e.target.value)
    const options = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" },
    ]

    const [personName, setPersonName] = React.useState([])
    const handleChangeMultiple = (event) => {
        const { options } = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        setPersonName(value)
    }

    return (
        <>
            {/* <Select
                multiple
                native
                value={personName}
                onChange={handleChangeMultiple}
                label="Native"
                inputProps={{
                    id: "select-multiple-native",
                }}
            >
                {names.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </Select> */}
        </>
    )
}

export default ScrollPicker
