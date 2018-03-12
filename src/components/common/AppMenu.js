/* eslint-disable import/no-named-as-default */
import React from 'react';
import {Link} from 'react-router-dom'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

const AppMenu = () => {
  return (
    <List component="nav">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <ListItem button >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </Link>
      <Link to="/about" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </Link>
    </List>
  );
};

export default AppMenu;
