import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AccordionPanel from "./AccordionPanel/AccordionPanel";

const styles = theme => ({
    root: {
        width: "100%"
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
});

class Accordion extends React.Component {
    state = {
        expanded: this.props.initialPanel
    };

    handleChange = panel => {
        this.setState({
            expanded: panel
        });
    };

    render() {
        const { classes, content } = this.props;
        const { expanded } = this.state;
        const panels = content
            ? content.map(panel => (
                  <AccordionPanel
                      key={panel.name}
                      name={panel.name}
                      title={panel.name}
                      expanded={expanded === panel.name}
                      onChange={name => {
                          this.handleChange(name);
                      }}
                  >
                      {panel.content}
                  </AccordionPanel>
              ))
            : null;
        return <div className={classes.root}>{panels}</div>;
    }
}

Accordion.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Accordion);
