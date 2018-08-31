import React, { Component } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { getMenusByCategory } from "../../../../firebase/MenuService";
import AdminMenuCard from "../../../../components/MenuCard/AdminMenuCard/AdminMenuCard";

const style = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        padding: "24px",
        marginBottom: "64px",
        backgroundColor: "transparent"
    },
    title: {
        textTransform: "capitalize",
        width: "100%",
        marginBottom: "16px"
    }
};

class MenuPanel extends Component {
    menusRef = null;
    state = {
        menus: null
    };
    componentDidMount() {
        this.menusRef = getMenusByCategory(this.props.category);
        this.menusRef.on("value", snapshot => {
            this.setState({ menus: snapshot.val() });
        });
    }
    componentWillUnmount() {
        if (this.menusRef) {
            this.menusRef.off();
        }
    }
    render() {
        const { classes } = this.props;
        const menuCards = this.state.menus
            ? Object.keys(this.state.menus).map(key => (
                  <AdminMenuCard key={key} menu={this.state.menus[key]} />
              ))
            : null;
        return (
            <Paper className={classes.root}>
                <Typography
                    className={classes.title}
                    component={"h3"}
                    variant={"title"}
                >
                    {this.props.title}
                </Typography>
                {menuCards}
            </Paper>
        );
    }
}

export default withStyles(style)(MenuPanel);
