import React, { useEffect, useRef, useState } from "react";

import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CardItem = (props) => {
    //Identifying if mouse is over
    const [mouseOver, setMouseOver] = useState(false)

    return <Box sx={props.itemChecked.includes(props.value) ? {
        width: '100%',
        height: '170px',
        borderBottom: `0.5px solid ${props.theme.cardBorderColor}`,
        backgroundColor: props.theme.backgroundHover
    }
        :
        {
            width: '100%',
            height: '170px',
            borderBottom: `0.5px solid ${props.theme.cardBorderColor}`,
            '&:hover': {
                backgroundColor: props.theme.backgroundHover
            }

        }
    }
        onMouseEnter={() => { setMouseOver(true) }}
        onMouseLeave={() => { setMouseOver(false) }}
    >
        <Box sx={{
            padding: '20px 15px',
            display: 'flex',
            flexDirection: 'row',
        }}>
            {mouseOver || props.anyItemChecked.length > 0 ?
                <Checkbox
                    value={props.value}
                    onChange={props.handleCheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                        width: 80,
                        height: 80,
                        alignSelf: 'center',
                        padding: '0px'
                    }}
                    icon={<CircleIcon sx={{
                        widht: '70px',
                        height: '70px',
                        color: props.theme.color
                    }} />}
                    checkedIcon={<CheckCircleIcon sx={{
                        widht: '70px',
                        height: '70px'
                    }} />} />
                :
                <Avatar sx={{
                    width: 80,
                    height: 80,
                    alignSelf: 'center'
                }}>{props.owner}</Avatar>
            }
            <Box sx={{ ml: 4, color: props.theme.color }}>
                <Typography variant="h5">
                    {props.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {props.subject}
                </Typography>
                <Box sx={{
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <WhatsAppIcon />
                    <Typography variant="body2" sx={{ ml: 3 }}>
                        Caixa de entrada
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                marginLeft: 'auto',
                color: props.theme.color,
            }}>
                <Typography variant='body2'>
                    Hoje, 11:42
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                    -2 horas
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: 5
                }} >
                    {props.users.map(user =>
                        <Avatar key={user}
                            sx={user[0] ? { marginLeft: '-5px' } : {}}>{user}</Avatar>)}
                </Box>
            </Box>
        </Box>
    </Box >
};

export default CardItem
