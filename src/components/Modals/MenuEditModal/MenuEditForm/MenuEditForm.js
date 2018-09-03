import React, { Component } from "react";
import { menuCategories } from "../../../../firebase/common/models";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip/Chip";
import Button from "@material-ui/core/Button/Button";
import { getArrayWithoutItem } from "../../../../utils/utils";

const style = {
    root: {
        display: "flex",
        flexDirection: "column"
    },
    menuCategory: {
        textTransform: "capitalize"
    },
    chip: {
        margin: "0px 4px 4px 0px"
    },
    modalButtonsContainer: {
        textAlign: "right",
        paddingTop: 16
    }
};
class MenuEditForm extends Component {
    state = {
        menu: this.props.menu,
        newOption: ""
    };
    render() {
        const { menu, newOption } = this.state;
        const { classes } = this.props;
        const categoryOptions = Object.keys(menuCategories).map(key => (
            <MenuItem
                key={key}
                value={menuCategories[key]}
                className={classes.menuCategory}
            >
                {menuCategories[key]}
            </MenuItem>
        ));
        const menuOptions = menu.options
            ? menu.options.map((option, index) => (
                  <Chip
                      key={index}
                      label={option}
                      onDelete={() => {
                          this.handleDeleteOption(option);
                      }}
                      className={classes.chip}
                  />
              ))
            : null;
        const menuOptionAddButton = newOption ? (
            <InputAdornment position="end">
                <IconButton
                    aria-label="Add Menu Option"
                    onClick={this.handleClickAddOption}
                    // onMouseDown={this.handleMouseDownPassword}
                >
                    <AddIcon />
                </IconButton>
            </InputAdornment>
        ) : null;
        return (
            <form
                autoComplete="off"
                className={classes.root}
                onSubmit={this.handleSubmit}
            >
                <FormControl>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        className={classes.menuCategory}
                        name="category"
                        value={menu.category}
                        onChange={this.handleChange}
                    >
                        {categoryOptions}
                    </Select>
                </FormControl>
                <TextField
                    name="title"
                    label="Title"
                    // className={classes.textField}
                    value={menu.title}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    name="image"
                    label="Image URL"
                    // className={classes.textField}
                    value={menu.image}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    name="description"
                    label="Description"
                    // className={classes.textField}
                    value={menu.description}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    name="addMenuOption"
                    label="Add Menu Option"
                    // className={classes.textField}
                    value={newOption}
                    onChange={this.handleChange}
                    margin="normal"
                    InputProps={{
                        endAdornment: menuOptionAddButton
                    }}
                />
                <div>{menuOptions}</div>
                <div className={classes.modalButtonsContainer}>
                    <Button size="medium" onClick={this.props.onFormCancelled}>
                        Cancel
                    </Button>
                    <Button type="submit" size="medium">
                        Save
                    </Button>
                </div>
            </form>
        );
    }

    handleSubmit = evt => {
        evt.preventDefault();
        this.props.onFormSubmitted(this.state.menu);
    };
    handleChange = event => {
        const inputName = event.target.name;
        const newValue = event.target.value;
        if (inputName === "addMenuOption") {
            this.setState({ newOption: newValue });
        } else {
            const newMenu = { ...this.state.menu, [inputName]: newValue };
            this.setState({ menu: newMenu });
        }
    };
    handleClickAddOption = () => {
        const newOptions = this.state.menu.options
            ? this.state.menu.options.concat(this.state.newOption)
            : [this.state.newOption];
        const newMenu = { ...this.state.menu, options: newOptions };
        console.log(newMenu);
        this.setState({ menu: newMenu, newOption: "" });
    };
    handleDeleteOption = option => {
        const newOptions = getArrayWithoutItem(this.state.menu.options, option);
        const newMenu = { ...this.state.menu, options: newOptions };
        this.setState({ menu: newMenu });
    };
}

export default withStyles(style)(MenuEditForm);
