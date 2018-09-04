import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import FastFoodIcon from "@material-ui/icons/Fastfood";
import UserIcon from "@material-ui/icons/SupervisedUserCircle";
import ViewListIcon from "@material-ui/icons/ViewList";
import CalendarIcon from "@material-ui/icons/CalendarToday";

export const AdminMenuLinks = Object.freeze({
    MENUS: "Menus",
    CURRENT_MENU: "Current Menu",
    ORDERS: "Orders",
    USERS: "Users"
});

export const CustomerMenuLinks = Object.freeze({
    CURRENT_MENU: "Current Menu"
});

export const MenuLinks = {
    admin: [
        {
            value: AdminMenuLinks.MENUS,
            icon: (
                <ListItemIcon>
                    <FastFoodIcon />
                </ListItemIcon>
            )
        },
        {
            value: AdminMenuLinks.CURRENT_MENU,
            icon: (
                <ListItemIcon>
                    <CalendarIcon />
                </ListItemIcon>
            )
        },
        {
            value: AdminMenuLinks.ORDERS,
            icon: (
                <ListItemIcon>
                    <ViewListIcon />
                </ListItemIcon>
            )
        },
        {
            value: AdminMenuLinks.USERS,
            icon: (
                <ListItemIcon>
                    <UserIcon />
                </ListItemIcon>
            )
        }
    ],
    customer: [
        {
            value: CustomerMenuLinks.CURRENT_MENU,
            icon: (
                <ListItemIcon>
                    <CalendarIcon />
                </ListItemIcon>
            )
        }
    ]
};
