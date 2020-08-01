import React from "react"
import { UserOutlined, SettingOutlined, MoneyCollectOutlined, HistoryOutlined } from '@ant-design/icons'
import DropdownItems from "components/lib/navigation/dropdown/dropdown-items";

const items = [
    { title: "プロフィール", link: '/account/profile', icon: <UserOutlined /> },
    { title: "アカウント設定", link: '/account/settings/base', icon: <SettingOutlined /> },
    { title: "購入履歴", link: '/account/history', icon: <HistoryOutlined /> },
    { title: "売上管理", link: '/account/sales', icon: <MoneyCollectOutlined /> },
];

const AccountDropdownMenu = () => {
    return (
        <DropdownItems items={items} />
        // <Menu>
        //     <div style={{ padding: '8px' }}>
        //         <AvatarImage imageUrl={avatarImage} displayName={userName} />
        //         <span style={{ marginLeft: '8px' }}>{userName}</span>
        //     </div>
        //     <Divider style={{ margin: '6px 0px' }} />
        //     {items.map(item => {
        //         return (
        //             <Menu.Item>
        //                 <DropdownItem title={item.title} icon={item.icon} link={item.link} />
        //             </Menu.Item>
        //         )
        //     })}
        //     <Divider style={{ margin: '6px 0px' }} />
        //     <Menu.Item onClick={() => logout()}>
        //         <LogoutOutlined style={{ marginRight: '8px' }} />ログアウト
        //     </Menu.Item>
        // </Menu>
    );
}

export default AccountDropdownMenu;