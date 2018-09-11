import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

const RadioButtonList = props => {
    const items = props.list.map((item, index) => (
        <FormControlLabel
            key={index}
            value={item}
            control={
                <Radio
                    onClick={event => props.onOptionSelected(event)}
                    disabled={props.disabled}
                />
            }
            label={item}
        />
    ));
    return <RadioGroup value={props.selectedOption}>{items}</RadioGroup>;
};

export default RadioButtonList;
