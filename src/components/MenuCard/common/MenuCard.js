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
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import FavoriteEmptyIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartEmptyIcon from "@material-ui/icons/ShoppingCartOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Aux from "../../../hoc/Aux/Aux";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import lightBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";
import CheckboxList from "../../CheckboxList/CheckboxList";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import RadioButtonList from "../../RadioButtonList/RadioButtonList";

const styles = theme => ({
    root: {},
    spinner: {
        padding: "100px"
    },
    card: {
        width: 300,
        textAlign: "center",
        transition: "box-shadow 0.3s"
    },
    cardSelected: {
        boxShadow: "0px 0px 9px 4px rgb(76, 175, 80)"
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
    favoriteIcon: {
        color: pink[200]
    },
    shopCartIcon: {
        color: green[500]
    },
    disabledIcon: {
        color: grey[200]
    },
    editIcon: {
        color: lightBlue[700]
    }
});

class RecipeReviewCard extends React.Component {
    state = {
        expanded: false,
        editOptionsOpen: false,
        anchorEl: null,
        isFavorite: false
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, menu, isAdmin, disabled } = this.props;
        const selectedMenuOption = this.props.options
            ? this.props.options[0]
            : null;
        // const favoriteIcon = this.state.isFavorite ? (
        //     <FavoriteIcon className={classes.favoriteIcon} />
        // ) : (
        //     <FavoriteEmptyIcon className={classes.favoriteIcon} />
        // );
        const shoppingCartIcon = this.props.selected ? (
            <ShoppingCartIcon
                className={classnames(classes.shopCartIcon, {
                    [classes.disabledIcon]: disabled
                })}
            />
        ) : (
            <ShoppingCartEmptyIcon
                className={classnames(classes.shopCartIcon, {
                    [classes.disabledIcon]: disabled
                })}
            />
        );
        const menuEditOptions = (
            <Menu
                id="editOptions"
                anchorEl={this.state.anchorEl}
                open={this.state.editOptionsOpen}
                onClose={() => this.handleMenuEditOptionsClose()}
            >
                <MenuItem onClick={() => this.handleEditClick()}>
                    <EditIcon className={classes.editIcon} />
                </MenuItem>
                <MenuItem onClick={() => this.handleDeleteClick()}>
                    <DeleteIcon color="secondary" />
                </MenuItem>
            </Menu>
        );
        const cardActionButton = (
            <IconButton
                aria-owns={this.state.anchorEl ? "editOptions" : null}
                aria-haspopup="true"
                onClick={event => {
                    this.handleMenuEditOptionsOpen(event);
                }}
            >
                <MoreVertIcon />
            </IconButton>
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
                            <div>
                                {cardActionButton}
                                {menuEditOptions}
                            </div>
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
                        aria-label="Order"
                        disabled={isAdmin || disabled}
                        onClick={() => {
                            this.props.onMenuSelected();
                        }}
                    >
                        {shoppingCartIcon}
                    </IconButton>
                    {/*<IconButton*/}
                    {/*aria-label="Add to favorites"*/}
                    {/*disabled={isAdmin}*/}
                    {/*onClick={() => {*/}
                    {/*this.onFavoriteButtonClicked();*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*{favoriteIcon}*/}
                    {/*</IconButton>*/}
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
                            <RadioButtonList
                                list={menu.options}
                                selectedOption={
                                    isAdmin ? null : selectedMenuOption
                                }
                                disabled={
                                    !this.props.selected || isAdmin || disabled
                                }
                                onOptionSelected={item =>
                                    this.props.onMenuDetailSelected(item)
                                }
                            />
                        ) : // <CheckboxList
                        //     list={menu.options}
                        //     selectedOptions={
                        //         isAdmin ? null : this.props.options
                        //     }
                        //     disabled={!this.props.selected || isAdmin}
                        //     onOptionSelected={item =>
                        //         this.props.onMenuDetailSelected(item)
                        //     }
                        // />
                        null}
                    </CardContent>
                </Collapse>
            </Aux>
        ) : (
            <CircularProgress className={classes.spinner} size={50} />
        );
        return (
            <Card
                className={classnames(classes.card, {
                    [classes.cardSelected]: this.props.selected && menu
                })}
            >
                {cardContent}
            </Card>
        );
    }
    // onFavoriteButtonClicked = () => {
    //     this.setState(state => ({ isFavorite: !state.isFavorite }));
    // };

    handleMenuEditOptionsClose = () => {
        this.setState({ editOptionsOpen: false, anchorEl: null });
    };
    handleEditClick = () => {
        this.handleMenuEditOptionsClose();
        this.props.onEditClicked();
    };
    handleDeleteClick = () => {
        this.handleMenuEditOptionsClose();
        this.props.onDeleteClicked();
    };
    handleMenuEditOptionsOpen = event => {
        this.setState({ editOptionsOpen: true, anchorEl: event.currentTarget });
    };
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
