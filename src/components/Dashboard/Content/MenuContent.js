import React, { useEffect, useState } from "react";

import { Box } from "@mui/system";
import CardItem from "./CardItem";
import { Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const MenuContent = (props) => {
    //State for items that have already been filtered 
    const [filteredItems, setFilteredItems] = useState([])

    //Items that have been already checked
    const [itemChecked, setItemChecked] = useState([]);

    //Check if there's any item checked now
    const [anyItemChecked, setAnyItemChecked] = useState([]);

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        let updatedList = [...itemChecked];
        if (event.target.checked) {
            updatedList = [...itemChecked, event.target.value];
        }
        else {
            updatedList.splice(itemChecked.indexOf(event.target.value), 1);
        }
        setItemChecked(updatedList);
        setAnyItemChecked(updatedList);
    };

    const archiveHandler = () => {
        setFilteredItems(itemChecked);
        setAnyItemChecked([]);
    }

    //Archive state
    function archiveFilter(item) {
        return !filteredItems.includes(item.id)
    };

    console.log(anyItemChecked)
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            mt: 3,
            ml: 3,
            width: '80%',
            alignSelf: 'flex-end'
        }}>
            <Checkbox sx={{
                "& .MuiSvgIcon-root": {
                    color: props.theme.color
                },
            }} />
            <Button variant="contained" sx={{ ml: 2 }}>{props.lang.assignButton}</Button>
            <Button variant="contained" sx={{ ml: 2 }}
                onClick={archiveHandler}
            >{props.lang.archiveButton}</Button>
            <Button variant="contained" sx={{ ml: 2 }}>{props.lang.scheduleButton}</Button>
        </Box>
        <Box sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
        }}>
            {
                props.menuItems.filter(archiveFilter).map(item =>
                    <CardItem
                        theme={props.theme}
                        key={item.id}
                        name={item.name}
                        subject={item.subject}
                        owner={item.owner}
                        users={item.users}
                        value={item.id}
                        handleCheck={handleCheck}
                        itemChecked={itemChecked}
                        anyItemChecked={anyItemChecked}
                    />)
            }
        </Box>
    </Box>
};

export default MenuContent;