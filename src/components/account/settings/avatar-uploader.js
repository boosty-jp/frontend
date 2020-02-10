import React from "react"
import { Upload, Button, Icon, message, Spin } from 'antd';
import AvatarImage from "components/avatar/image";
import getFirebase from "utils/firebase";
import uuidv4 from 'uuid/v4'

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

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
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: props.imageUrl,
        }
    }

    customUpload = async ({ onError, onSuccess, file }) => {
        this.setState({ loading: true });
        const firebase = getFirebase();

        const metadata = {
            contentType: file.type
        }

        const storageRef = await firebase.storage().ref()

        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
                message.error("エラーが発生しました。ログインが必要です。", 10)
            } else {
                const fileName = 'profile-' + uuidv4();
                const imgFile = storageRef.child(`user/${user.uid}/${fileName}.png`)

                try {
                    const image = await imgFile.put(file, metadata);
                    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + image.metadata.bucket + "/o/" + encodeURIComponent(image.metadata.fullPath) + "?alt=media";
                    this.setState({ imageUrl: imageUrl });
                    this.props.onComplete(imageUrl);
                    onSuccess(null, image);
                } catch (e) {
                    message.error("エラーが発生しました。画像の容量をご確認の上、再度お試しください。");
                    onError(e);
                }
                this.setState({ loading: false });
            }
        })
    };

    removeImage = () => {
        this.props.onComplete("");
        this.setState({ imageUrl: '' });
    }

    render() {
        const { imageUrl, loading } = this.state;
        return (
            <Spin spinning={loading} tip="アップロード中です" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <div style={{ marginTop: '10px' }}>
                        <Upload
                            showUploadList={false}
                            // transformFile={transformFile}
                            beforeUpload={beforeUpload}
                            customRequest={this.customUpload}
                        >
                            {imageUrl ?
                                <>
                                    <AvatarImage imageUrl={imageUrl} displayName={this.props.displayName} size={100} style={{ fontSize: '40px' }} />
                                    <Button type="dashed" block style={{ marginTop: '10px' }} onClick={this.removeImage}><Icon type="delete" /> 削除する</Button>
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
            </Spin>
        )
    }
}

export default AvatarUploader;