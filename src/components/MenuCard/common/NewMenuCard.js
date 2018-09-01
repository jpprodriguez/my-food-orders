import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteEmptyIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShoppingCartEmptyIcon from "@material-ui/icons/ShoppingCartOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Aux from "../../../hoc/Aux/Aux";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import lightBlue from "@material-ui/core/colors/lightBlue";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
    root: {
        position: "relative",
        margin: "0 16px 16px 0px"
    },
    card: {
        width: 300,
        textAlign: "center",
        filter: "blur(2px)",
        boxShadow: "none"
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    actions: {
        display: "flex"
    },
    description: {
        height: 30,
        [theme.breakpoints.up("sm")]: {
            height: 60
        },
        overflow: "auto"
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        }),
        [theme.breakpoints.up("sm")]: {
            marginRight: -8
        }
    },
    expandTitle: {
        marginLeft: "auto"
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    title: {
        textTransform: "capitalize"
    },
    avatar: {
        backgroundColor: red[500]
    },
    favoriteIcon: {
        color: pink[200]
    },
    shopCartIcon: {
        color: green[500]
    },
    editIcon: {
        color: lightBlue[700]
    },
    addButtonContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#808080ad",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        borderRadius: "4px",
        boxShadow:
            "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)"
    }
});

class NewMenuCard extends React.Component {
    state = { expanded: false, isFavorite: false };

    render() {
        const { classes } = this.props;

        const cardContent = (
            <Aux>
                <CardHeader
                    title={<span className={classes.title}>New Menu</span>}
                    subheader="New Name"
                />
                <CardMedia
                    className={classes.media}
                    image={
                        "http://mamadips.com/wp-content/uploads/2016/11/defimage.gif"
                    }
                />
                <CardContent>
                    <Typography component="p" className={classes.description}>
                        New Description
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites" disabled>
                        <ShoppingCartEmptyIcon
                            className={classes.shopCartIcon}
                        />
                    </IconButton>
                    <IconButton aria-label="Add to favorites" disabled>
                        <FavoriteEmptyIcon className={classes.favoriteIcon} />
                    </IconButton>
                    <Typography
                        className={classes.expandTitle}
                        color="textSecondary"
                    >
                        Opciones
                    </Typography>
                    <IconButton className={classes.expand}>
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </Aux>
        );
        return (
            <div className={classes.root}>
                <div className={classes.addButtonContainer}>
                    <Button
                        variant="fab"
                        color="primary"
                        onClick={this.props.onAddButtonClicked}
                    >
                        <AddIcon />
                    </Button>
                </div>
                <Card className={classes.card}>{cardContent}</Card>
            </div>
        );
    }
}

NewMenuCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewMenuCard);
