import React from "react"
import { Menu } from 'antd';
import DropdownItem from "components/lib/navigation/dropdown/dropdown-item";
import { LogoutOutlined } from '@ant-design/icons'
import { logout } from "utils/logout";

const DropdownItems = ({ items = [] }) => {
    return (
        <Menu>
            {items.map(item => {
                return (
                    <Menu.Item key={item.title} style={{ margin: '0' }}>
                        <DropdownItem title={item.title} icon={item.icon} link={item.link} />
                    </Menu.Item>
                )
            })}
            <Menu.Divider />
            <Menu.Item onClick={() => logout()} key="logout">
                <DropdownItem title="ログアウト" icon={<LogoutOutlined />} />
            </Menu.Item>
        </Menu>
    );
}

export default DropdownItems