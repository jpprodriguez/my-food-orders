import React from "react";
import MenuPerDayMobile from "./MenuPerDayMobile/MenuPerDayMobile";
import MenuPerDayDesktop from "./MenuPerDayDesktop/MenuPerDayDesktop";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth/withWidth";

const MenuPerDayCard = props => {
    return isWidthUp("md", props.width) ? (
        <MenuPerDayDesktop day={props.day}>{props.children}</MenuPerDayDesktop>
    ) : (
        <MenuPerDayMobile day={props.day}>{props.children}</MenuPerDayMobile>
    );
};

export default withWidth()(MenuPerDayCard);
