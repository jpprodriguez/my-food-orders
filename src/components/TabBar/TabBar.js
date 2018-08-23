import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearQuery from "../LinearQuery/LinearQuery";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    }
});

class TabBar extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const tabs = this.props.items.map(item => {
            return <Tab key={item} label={item} />;
        });
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {tabs}
                    </Tabs>
                </AppBar>
                {this.props.content ? (
                    this.props.content[value]
                ) : (
                    <LinearQuery />
                )}
            </div>
        );
    }
}

TabBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabBar);
