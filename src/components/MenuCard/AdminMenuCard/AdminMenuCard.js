import React from "react";
import MenuCard from "../common/MenuCard";

class AdminMenuCard extends React.Component {
    state = {
        isModalOpen: false
    };
    render() {
        const { menu, id, onEditClicked, onDeleteClicked } = this.props;
        return (
            <MenuCard
                isAdmin={true}
                menu={menu}
                selected={false}
                options={menu.options}
                onMenuSelected={null}
                onMenuDetailSelected={null}
                onEditClicked={() => onEditClicked(menu, id)}
                onDeleteClicked={() => onDeleteClicked(id)}
            />
        );
    }
}

export default AdminMenuCard;
