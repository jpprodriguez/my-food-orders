import React from "react";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const CheckboxList = props => {
    return (
        <List>
            {props.list.map(item => {
                const checked = !!(
                    props.selectedOptions &&
                    props.selectedOptions.length > 0 &&
                    props.selectedOptions.indexOf(item) !== -1
                );
                return (
                    <ListItem
                        key={item}
                        role={undefined}
                        dense
                        button
                        disabled={props.disabled}
                        onClick={() => props.onOptionSelected(item)}
                    >
                        <Checkbox
                            checked={checked}
                            value="checked"
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={item} />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default CheckboxList;
