import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
        textTransform: "capitalize"
    }
});
const AccordionPanel = props => {
    const { classes, children, title, name, expanded, onChange } = props;
    return (
        <ExpansionPanel
            expanded={expanded}
            onChange={() => {
                onChange(name);
            }}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withStyles(styles)(AccordionPanel);
