import React, { Component } from "react";
import Accordion from "../../../../components/Accordion/Accordion";
import { days } from "../../../../firebase/common/models";
import withStyles from "@material-ui/core/styles/withStyles";
import CurrentMenuEditForm from "../../../../components/Forms/CurrentMenuEditForm/CurrentMenuEditForm";
import {
    getCurrentMenuRef,
    updateCurrentMenuByDay
} from "../../../../firebase/currentMenuService";
import { getMenus } from "../../../../firebase/MenuService";
import { SnackbarTypes } from "../../../../components/Snackbar/Snackbars";
import { toast } from "react-toastify";
import Snackbar from "../../../../components/Snackbar/Snackbars";

const styles = {
    root: {
        maxWidth: 800
    }
};
class CurrentMenuPanel extends Component {
    state = {
        currentMenu: null,
        allMenus: null
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        const { classes } = this.props;
        const { allMenus, currentMenu } = this.state;
        const panels = currentMenu
            ? days.map(day => ({
                  name: day,
                  content: (
                      <CurrentMenuEditForm
                          onFormSubmitted={newCurrentMenu => {
                              this.handleCurrentMenuUpdate(newCurrentMenu, day);
                          }}
                          allMenus={allMenus}
                          currentMenu={currentMenu[day]}
                      />
                  )
              }))
            : null;
        const accordion = panels ? (
            <Accordion content={panels} initialPanel={panels[0].name} />
        ) : null;
        return <div className={classes.root}>{accordion}</div>;
    }
    getData = () => {
        getMenus().once("value", snapshot => {
            this.setState({ allMenus: snapshot.val() }, () => {
                getCurrentMenuRef().once("value", snapshot => {
                    this.setState({ currentMenu: snapshot.val() });
                });
            });
        });
    };
    handleCurrentMenuUpdate = (newCurrentMenu, day) => {
        updateCurrentMenuByDay(newCurrentMenu, day)
            .then(() => {
                toast(
                    <Snackbar
                        variant={SnackbarTypes.success}
                        message="Menu successfully updated"
                    />
                );
            })
            .catch(err => {
                toast(
                    <Snackbar
                        variant={SnackbarTypes.error}
                        message={err.message}
                    />
                );
            });
    };
}

export default withStyles(styles)(CurrentMenuPanel);
