import React, { useEffect, useState } from "react";

import { Box } from "@mui/system"
import MenuContent from "./Content/MenuContent";
import Sidebar from "./Sidebar/Sidebar"


const Dashboard = (props) => {
    //Identifying JSON id
    const [menuItems, setMenuItems] = useState([]);

    //Cards archive condition
    const [archive, setArchive] = useState(false);

    return <Box sx={{
        display: 'flex'
    }}>
        <Sidebar
            setIsSubmitted={props.setIsSubmitted}
            menu={props.menu}
            setMenuItems={setMenuItems}
            lang={props.lang}
            theme={props.theme}
            setArchive={setArchive}
        />
        <Box component='main'
            sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <MenuContent
                menuItems={menuItems}
                items={props.items}
                lang={props.lang}
                theme={props.theme}
                archive={archive}
                setArchive={setArchive}
            />
        </Box>
    </Box>
};

export default Dashboard;