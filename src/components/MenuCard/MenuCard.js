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
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteEmptyIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartEmptyIcon from "@material-ui/icons/ShoppingCartOutlined"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getMenuByIdRef } from "../../firebase/MenuService";
import Aux from "../../hoc/Aux/Aux";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

const styles = theme => ({
    root: {

    },
    card: {
        maxWidth: 400
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
    avatar: {
        backgroundColor: red[500]
    },
    favoriteIcon: {
        color: pink[200]
    },
    shopCartIcon: {
        color: green[500]
    }
});

class RecipeReviewCard extends React.Component {
    state = { expanded: false, menu: null, isFavorite: false };
    menuByIdRef = null;

    componentDidMount() {
        this.menuByIdRef = getMenuByIdRef(this.props.menuId).on(
            "value",
            snapshot => {
                this.setState({ menu: snapshot.val() });
            }
        );
    }
    componentWillUnmount() {
        if (this.menuByIdRef.hasOwnProperty('off')) {
            this.menuByIdRef.off();
        }
    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;
        const favoriteIcon = this.state.isFavorite ? <FavoriteIcon className={classes.favoriteIcon}/> : <FavoriteEmptyIcon className={classes.favoriteIcon}/>
        const cardContent = this.state.menu ? (
            <Aux className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.state.menu.category}
                    subheader={this.state.menu.title}
                />
                <CardMedia
                    className={classes.media}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCemZZcjzkfYoN5bHkL45SeHzpOj9OTQmjXdDHxWHasEn44adL"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography component="p">
                        {this.state.menu.description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <ShoppingCartEmptyIcon className={classes.shopCartIcon}/>
                    </IconButton>
                    <IconButton aria-label="Add to favorites" onClick={() => {this.onFavoriteButtonClicked()}}>
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
                        <Typography component="p">
                            {this.state.menu.description}
                        </Typography>
                        {/*<Checkbox*/}
                            {/*checked={this.state.checkedG}*/}
                            {/*onChange={this.handleChange('checkedG')}*/}
                            {/*value="checkedG"*/}
                            {/*color="primary"*/}
                        {/*/>*/}
                    </CardContent>
                </Collapse>
            </Aux>
        ) : null;
        return (
            <Card className={classes.card}>{cardContent}</Card>
        );
    }
    onFavoriteButtonClicked = () => {
        this.setState(state => ({isFavorite: !state.isFavorite}));
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
