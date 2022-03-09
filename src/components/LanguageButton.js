import React from "react";

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const LanguageButton = (props) => {

    const lang = props.lang;

    const handleChange = (event) => {
        props.setLang(event.target.value)
    };

    return <Box sx={{
        minWidth: 120,
        position: "absolute",
        top: "15px",
        right: '40px',
        zIndex: "1",
    }}>
        <FormControl fullWidth>
            <Select
                value={lang}
                onChange={handleChange}
                sx={{
                    height: '30px',
                    width: '100px',
                    color: props.theme.color,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: props.theme.color
                    },
                    "& .MuiOutlinedInput-notchedOutline::hover": {
                        borderColor: props.theme.color
                    },
                    "& .MuiSvgIcon-root": {
                        color: props.theme.color,
                    },
                }}
            >
                <MenuItem default value={props.pt_BR}>PT_BR</MenuItem>
                <MenuItem value={props.en}>EN</MenuItem>
            </Select>
        </FormControl>
    </Box>
};

export default LanguageButton;