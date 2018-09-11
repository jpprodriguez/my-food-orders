import React, { Component } from "react";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";
import Button from "@material-ui/core/Button/Button";
import {
    getArrayWithoutItem,
    removeAttributesFromObject
} from "../../../utils/utils";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

const style = {
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    chip: {
        margin: "0px 4px 4px 0px"
    },
    modalButtonsContainer: {
        textAlign: "right",
        paddingTop: 16
    },
    menuSelect: {
        marginBottom: 24
    }
};
class CurrentMenuEditForm extends Component {
    state = {
        currentMenu: this.props.currentMenu,
        availableMenus: removeAttributesFromObject(
            this.props.allMenus,
            this.props.currentMenu
        ),
        menuToAdd: ""
    };
    render() {
        const { currentMenu, menuToAdd, availableMenus } = this.state;
        const { classes, allMenus } = this.props;
        const currentMenus = currentMenu
            ? currentMenu.map(menuId => {
                  const menu = allMenus[menuId];
                  return (
                      <Chip
                          key={menuId}
                          label={menu.title}
                          onDelete={() => {
                              this.handleDeleteOption(menuId);
                          }}
                          className={classes.chip}
                      />
                  );
              })
            : null;
        const availableMenusSelect = availableMenus
            ? Object.keys(availableMenus).map(menuKey => (
                  <MenuItem key={menuKey} value={menuKey}>
                      {availableMenus[menuKey].title}
                  </MenuItem>
              ))
            : null;
        return (
            <form
                autoComplete="off"
                className={classes.root}
                onSubmit={this.handleSubmit}
            >
                <FormControl>
                    <InputLabel htmlFor="category">Add Menu</InputLabel>
                    <Select
                        className={classes.menuSelect}
                        name="category"
                        value={menuToAdd}
                        onChange={this.handleChange}
                        disabled={Object.keys(availableMenus).length < 1}
                    >
                        {availableMenusSelect}
                    </Select>
                </FormControl>
                <div>{currentMenus}</div>
                <div className={classes.modalButtonsContainer}>
                    <Button
                        size="medium"
                        onClick={() => {
                            this.handleFormCancel();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" size="medium">
                        Save
                    </Button>
                </div>
            </form>
        );
    }
    handleFormCancel = () => {
        this.setState({
            currentMenu: this.props.currentMenu,
            availableMenus: removeAttributesFromObject(
                this.props.allMenus,
                this.props.currentMenu
            )
        });
    };
    handleSubmit = evt => {
        evt.preventDefault();
        this.props.onFormSubmitted(this.state.currentMenu);
    };
    handleChange = event => {
        const newValue = event.target.value;
        const newCurrentMenu = this.state.currentMenu
            ? this.state.currentMenu.concat(newValue)
            : [newValue];
        this.setState({
            currentMenu: newCurrentMenu,
            availableMenus: removeAttributesFromObject(
                this.state.availableMenus,
                newCurrentMenu
            )
        });
    };
    handleDeleteOption = menuId => {
        const newCurrentMenu = getArrayWithoutItem(
            this.state.currentMenu,
            menuId
        );
        const newAvailableMenus = { ...this.state.availableMenus };
        newAvailableMenus[menuId] = this.props.allMenus[menuId];
        this.setState({
            currentMenu: newCurrentMenu,
            availableMenus: newAvailableMenus
        });
    };
}

export default withStyles(style)(CurrentMenuEditForm);
