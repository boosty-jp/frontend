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

const AvatarImage = ({ imageUrl, displayName, style, size = "default" }) => {
    if (imageUrl) {
        return <Avatar src={imageUrl} style={style} size={size} alt="アカウント画像" />
    }

    if (displayName) {
        const showName = displayName.charAt(0);

        return (
            <Avatar
                size={size}
                style={{ ...style, backgroundColor: palettes[displayName.length % displayName.length] }}
            >
                {showName}
            </Avatar>
        )
    }

    return <Avatar icon={<UserOutlined />} style={style} size={size} />
}

export default AvatarImage