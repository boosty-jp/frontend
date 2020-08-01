import React from "react"
import { Dropdown } from 'antd';
import { getUserImage, getCurrentUser } from "services/local-user";
import AvatarImage from "components/lib/display/avatar/avatar-image";

const AccountDropdown = ({ placement = "bottomRight", trigger = ['hover'], menu }) => {
    const avatarImage = getUserImage();
    const userName = getCurrentUser().userName;

    return (
        <Dropdown overlay={menu} placement={placement} trigger={trigger}>
            <span style={{ cursor: 'pointer' }}>
                <AvatarImage imageUrl={avatarImage} displayName={userName} />
            </span>
        </Dropdown>
    )
}

export default AccountDropdown