import React from "react"
import { Upload, Button, Icon, message } from 'antd';
import AvatarImage from "components/avatar/image";
import getFirebase from "utils/firebase";

const transformFile = (file) => {
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
}

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('「jpeg」もしくは「png」拡張子以外はアップロードできません');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        message.error('1MB以上のファイルはアップロードできません');
    }
    return isJpgOrPng && isLt1M;
}

class AvatarUploader extends React.Component {
    state = {
        fileList: [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }]
    }

    handleChange = ({ fileList }) => {
        this.setState({ fileList })
    };

    customUpload = async ({ onError, onSuccess, file }) => {
        const firebase = getFirebase();

        const metadata = {
            contentType: file.type
        }

        console.log("ss", firebase.storage());
        const storageRef = await firebase.storage().ref()
        const uid = "hoge" //a unique name for the image
        const imgFile = storageRef.child(`profile/${uid}.png`)

        try {
            const image = await imgFile.put(file, metadata);
            console.log('s', image);
            onSuccess(null, image);
        } catch (e) {
            console.log('e', e);
            onError(e);
        }
    };

    render() {
        const { fileList } = this.state;
        return (
            <div style={{ textAlign: 'center', padding: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                    <Upload
                        showUploadList={false}
                        transformFile={transformFile}
                        beforeUpload={beforeUpload}
                        customRequest={this.customUpload}
                    >
                        {fileList.length >= 1 ?
                            <>
                                <AvatarImage imageUrl={fileList[0].url} displayName={this.props.displayName} size={100} style={{ fontSize: '40px' }} />
                                <Button type="dashed" block style={{ marginTop: '10px' }} onClick={() => this.setState({ fileList: [] })}><Icon type="delete" /> 削除する</Button>
                            </>
                            :
                            <>
                                <AvatarImage displayName={this.props.displayName} size={100} style={{ fontSize: '40px' }} />
                                <Button block style={{ marginTop: '10px' }}><Icon type="upload" /> アップロード</Button>
                            </>
                        }
                    </Upload>
                </div>
            </div>
        )
    }
}

export default AvatarUploader;