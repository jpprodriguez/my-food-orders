import React from "react";
import Drawer from "@material-ui/core/Drawer/Drawer";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ExitIcon from "@material-ui/icons/ExitToApp";

const styles = {
    drawerListContainer: {
        width: 250
    }
};

const SlidingDrawer = props => {
    const { classes, menuLinks } = props;
    const items = menuLinks
        ? menuLinks.map(link => (
              <ListItem
                  key={link.value}
                  button
                  onClick={() => {
                      props.onLinkClicked(link.value);
                      props.onDrawerClose();
                  }}
              >
                  {link.icon}
                  <ListItemText primary={link.value} />
              </ListItem>
          ))
        : null;
    return (
        <Drawer open={props.isDrawerOpen} onClose={props.onDrawerClose}>
            <div className={classes.drawerListContainer}>
                <List>
                    {items}
                    <ListItem button onClick={props.onLogout}>
                        <ListItemIcon>
                            <ExitIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default withStyles(styles)(SlidingDrawer);
