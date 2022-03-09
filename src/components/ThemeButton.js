import React from "react";

import { Box } from "@mui/system";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';

const ThemeButton = (props) => {
    const theme = props.theme;
    
    const setLightTheme = () => {
        props.setTheme(props.lightTheme)
    };

    const setDarkTheme = () => {
        props.setTheme(props.darkTheme)
    };
    
    return <Box sx={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        zIndex: '1',
    }}>
        {theme.condition ?
                    <Box 
                    sx={({
                        ...theme.icons
                    })}
                        onClick={setDarkTheme} >
                        <NightlightIcon fontSize="small"
                            sx={{ color: 'black' }} />
                    </Box>
                    :
                    <Box sx={({
                        ...theme.icons,
                        marginLeft: '10px'
                    })}
                        onClick={setLightTheme} >
                        <WbSunnyIcon fontSize="small"
                            sx={{ color: 'white'}} />
                    </Box>
                }
    </Box>
};

export default ThemeButton;