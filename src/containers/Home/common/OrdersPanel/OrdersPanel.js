import React, {Component} from 'react';
import {getAllUsers} from "../../../../firebase/userService";
import {days as daysModel} from "../../../../firebase/common/models";
import {objectToArray, objectToArrayWithKey} from "../../../../utils/utils";
import MenuTable from "../../../../components/MenuTable/MenuTable";
import TabBar from "../../../../components/TabBar/TabBar";
import {getOrderByDateRoute} from "../../../../firebase/common/routes";
import {getRef} from "../../../../firebase/common/utils";

class OrdersPanel extends Component {
    state = {
        users: null
    }
    days = daysModel;
    userSubscribers = [];

    componentDidMount() {
        getAllUsers()
            .then(snapshot => {
                // this.setState({users: objectToArrayWithKey(snapshot.val())});
                let users = objectToArrayWithKey(snapshot.val());
                let usersState = [];
                for(let user of users) {
                    usersState.push(user);
                    const index = usersState.index(user);
                    const userRef = getRef(getOrderByDateRoute(user.key, this.props.day));
                    userRef.on("value", snapshot => {

                    })
                    this.userSubscribers.push(userRef);
                }

            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {


        return (
            <div>
                {/*<MenuTable*/}
                    {/*users={this.users}*/}
                    {/*day={this.props.day}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default OrdersPanel;