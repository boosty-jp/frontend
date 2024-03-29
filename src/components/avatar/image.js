import React from "react"
import { Avatar } from 'antd';
import { UserOutlined } from "@ant-design/icons";

const palettes = [
    "#bae637",
    "#ff4d4f",
    "#40a9ff",
    "#ffa940",
    "#73d13d",
    "#ffc53d",
    "#ff7a45",
    "#9254de",
    "#36cfc9",
    "#597ef7",
    "#f759ab",
]

const AvatarImage = ({ imageUrl, displayName, style, size }) => {
    let avatarSize = "default"
    if (size) { avatarSize = size; }

    if (imageUrl) return <Avatar src={imageUrl} style={style} size={avatarSize} alt="アカウント画像" />
    if (displayName) return (
        <Avatar size={avatarSize} style={{ ...style, backgroundColor: palettes[displayName.length % 11] }}>{displayName.charAt(0)}</Avatar>
    )
    return (<Avatar icon={<UserOutlined />} style={style} size={avatarSize} />)
}
export default AvatarImage