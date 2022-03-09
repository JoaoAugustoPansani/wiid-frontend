import React, { useEffect, useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { List } from '@mui/material';
import { Box } from '@mui/system';
import Collapse from '@mui/material/Collapse';

const MenuTree = (props) => {
  //Show Submenu handlers
  const [showSubMenu, setShowSubMenu] = useState(false);

  const fetchData = async (id) => {
    //Getting data from items API
    const response = await fetch(`http://my-json-server.typicode.com/workinideas/vagafrontendteste/items/${id}`)
      .then(res => res.json());
     
      console.log(response)

    if (response.subMenuItems == undefined) {
      props.setMenuItems([]);
    } else {
      props.setMenuItems(response.subMenuItems)
    }

    props.setArchive(false)
  }

  return <Box sx={{ color: props.theme.color }}>
    <ListItem button
      key={props.id}
      onClick={() => { setShowSubMenu(!showSubMenu) }}>
      <ListItemIcon>
        {showSubMenu ?
          <ArrowDropDownIcon sx={{ color: props.theme.color }} />
          :
          <ArrowRightIcon sx={{ color: props.theme.color }} />}
      </ListItemIcon>
      <ListItemText primary={props.menuTitle} />

    </ListItem>
    <Collapse in={showSubMenu} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {props.subMenu.map(item =>
          <ListItemButton
            key={item.id}
            id={item.id}
            onClick={() => fetchData(item.id)}
            sx={{ pl: 4 }}>
            <ListItemText
              primary={item.name} />
          </ListItemButton>)}
      </List>
    </Collapse>
  </Box>
};

export default MenuTree;