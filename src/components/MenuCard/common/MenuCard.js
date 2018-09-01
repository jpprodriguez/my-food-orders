import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteEmptyIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartEmptyIcon from "@material-ui/icons/ShoppingCartOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Aux from "../../../hoc/Aux/Aux";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import lightBlue from "@material-ui/core/colors/lightBlue";
import CheckboxList from "../../CheckboxList/CheckboxList";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
    root: {},
    spinner: {
        padding: "100px"
    },
    card: {
        width: 300,
        textAlign: "center"
    },
    cardSelected: {
        boxShadow: "0px 0px 1px 3px #37ca8e"
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
    }
});

class RecipeReviewCard extends React.Component {
    state = { expanded: false, isFavorite: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, menu, isAdmin } = this.props;
        const favoriteIcon = this.state.isFavorite ? (
            <FavoriteIcon className={classes.favoriteIcon} />
        ) : (
            <FavoriteEmptyIcon className={classes.favoriteIcon} />
        );
        const shoppingCartIcon = this.props.selected ? (
            <ShoppingCartIcon className={classes.shopCartIcon} />
        ) : (
            <ShoppingCartEmptyIcon className={classes.shopCartIcon} />
        );
        const cardContent = menu ? (
            <Aux className={classes.root}>
                <CardHeader
                    title={
                        <span className={classes.title}>{menu.category}</span>
                    }
                    subheader={menu.title}
                    action={
                        isAdmin ? (
                            <IconButton
                                onClick={() => {
                                    this.props.onEditClicked();
                                }}
                            >
                                <EditIcon className={classes.editIcon} />
                            </IconButton>
                        ) : null
                    }
                />
                <CardMedia
                    className={classes.media}
                    image={
                        menu.image ||
                        "http://mamadips.com/wp-content/uploads/2016/11/defimage.gif"
                    }
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography component="p" className={classes.description}>
                        {menu.description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                        aria-label="Add to favorites"
                        disabled={isAdmin}
                        onClick={() => {
                            this.props.onMenuSelected();
                        }}
                    >
                        {shoppingCartIcon}
                    </IconButton>
                    <IconButton
                        aria-label="Add to favorites"
                        disabled={isAdmin}
                        onClick={() => {
                            this.onFavoriteButtonClicked();
                        }}
                    >
                        {favoriteIcon}
                    </IconButton>
                    <Typography
                        className={classes.expandTitle}
                        color="textSecondary"
                    >
                        Opciones
                    </Typography>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {menu.options ? (
                            <CheckboxList
                                list={menu.options}
                                selectedOptions={
                                    isAdmin ? null : this.props.options
                                }
                                disabled={!this.props.selected || isAdmin}
                                onOptionSelected={item =>
                                    this.props.onMenuDetailSelected(item)
                                }
                            />
                        ) : null}
                    </CardContent>
                </Collapse>
            </Aux>
        ) : (
            <CircularProgress className={classes.spinner} size={50} />
        );
        return <Card className={classes.card}>{cardContent}</Card>;
    }
    onFavoriteButtonClicked = () => {
        this.setState(state => ({ isFavorite: !state.isFavorite }));
    };
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
