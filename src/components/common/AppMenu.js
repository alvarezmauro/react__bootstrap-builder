/* eslint-disable import/no-named-as-default */
import React from 'react';
import {Link} from 'react-router-dom'

// List
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

// Icons
import HomeIcon from 'material-ui-icons/Home';
import InfoIcon from 'material-ui-icons/Info';

const AppMenu = () => {
  return (
    <List component="nav">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <ListItem button >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link to="/about" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Info" />
        </ListItem>
      </Link>
    </List>
  );
};

export default AppMenu;
