import React, { useState, useCallback, useEffect } from 'react';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import MenuTree from './MenuTree';
import { makeStyles } from '@material-ui/core/styles';

export const defaultDrawerWidth = 240;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

const useStyles = makeStyles(theme => ({
    drawer: {
        flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
    dragger: {
        width: "5px",
        cursor: "ew-resize",
        padding: "4px 0 0",
        borderTop: "1px solid #ddd",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0)"
    }
}));

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
};

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

const SideBar = (props) => {
    //Drawer resizable
    const classes = useStyles();
    const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);

    const handleMouseDown = e => {
        document.addEventListener("mouseup", handleMouseUp, true);
        document.addEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mouseup", handleMouseUp, true);
        document.removeEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseMove = useCallback(e => {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
            setDrawerWidth(newWidth);
        }
    }, []);

    //Show  Logout Popover handlers
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return <Drawer
        className={{ ...classes.drawer }}
        variant="permanent"
        PaperProps={{
            style: {
                width: drawerWidth,
                backgroundColor: props.theme.backgroundColor
            }
        }}

    >
        <div onMouseDown={e => handleMouseDown(e)} className={classes.dragger} />
        <Toolbar >
            <Avatar {...stringAvatar('Oscar Alarm')}
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={handleClick} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ mt: 1 }}
            >
                <Button variant='contained'
                    onClick={() => { props.setIsSubmitted(false) }}>
                    {props.lang.logoutButtonText}
                </Button>
            </Popover>
            <Select
                sx={{
                    height: '30px',
                    width: '100px',
                    ml: 5,
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
                <MenuItem >New</MenuItem>
            </Select>
        </Toolbar>
        <List>
            {
            props.menu.map(item =>
                <MenuTree
                    id={item.id}
                    menuTitle={item.name}
                    setMenuItems={props.setMenuItems}
                    subMenu={item.subMenus}
                    setActualJSONId={props.setActualJSONId}
                    theme={props.theme}
                    subMenus={props.menu.subMenuItems}
                    setArchive={props.setArchive}
                />)}
        </List>
    </Drawer>
};

export default SideBar;