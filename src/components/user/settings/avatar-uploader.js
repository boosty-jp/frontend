import React from "react"
import { Avatar, Upload, Button, Icon } from 'antd';

const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    transformFile(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const canvas = document.createElement('canvas');
                const img = document.createElement('img');
                img.src = reader.result;
                img.onload = () => {
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    ctx.fillStyle = 'red';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('Ant Design', 20, 20);
                    canvas.toBlob(resolve);
                };
            };
        });
    },
};

const AvatarUploader = () => {
    return (
        <div style={{ textAlign: 'center', padding: '10px' }}>
            <Avatar size={100} icon="user" />
            <div style={{ marginTop: '10px' }}>
                <Upload {...props}>
                    <Button size="small"><Icon type="upload" /> Upload</Button>
                </Upload>
            </div>
        </div>
    )
}

export default AvatarUploader;