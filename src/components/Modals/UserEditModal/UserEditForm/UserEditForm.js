import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

const style = {
    root: {
        display: "flex",
        flexDirection: "column"
    },
    modalButtonsContainer: {
        textAlign: "right",
        paddingTop: 16
    },
    radioButtonsContainer: {
        marginTop: 16
    }
};
class UserEditForm extends Component {
    state = {
        user: this.props.user
    };
    render() {
        const { user } = this.state;
        const { classes } = this.props;

        return (
            <form
                autoComplete="off"
                className={classes.root}
                onSubmit={this.handleSubmit}
            >
                <TextField
                    name="name"
                    label="Name"
                    value={user.name}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    name="email"
                    label="E-mail"
                    // value={user.email}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    name="fileNumber"
                    label="File Number"
                    value={user.fileNumber}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Veggie</FormLabel>
                    <RadioGroup
                        aria-label="Veggie"
                        name="isVeggie"
                        value={user.isVeggie.toString()}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Yes"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="No"
                        />
                    </RadioGroup>
                </FormControl>
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
        this.props.onFormSubmitted(this.state.user);
    };
    handleChange = event => {
        const inputName = event.target.name;
        let newValue = event.target.value;
        if (inputName === "isVeggie") {
            newValue = newValue === "true";
        }
        const newUser = { ...this.state.user, [inputName]: newValue };
        this.setState({ user: newUser });
    };
}

export default withStyles(style)(UserEditForm);
