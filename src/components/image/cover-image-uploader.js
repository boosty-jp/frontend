import React from "react"
import { Button, Empty, Upload, Icon, message, Spin } from 'antd';
import ThumbnailImage from "components/image/thumbnail";
import getFirebase from "utils/firebase";
import uuidv4 from 'uuid/v4'

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('「jpeg」もしくは「png」拡張子以外はアップロードできません');
    }
    const isLt1M = file.size / 1024 / 1024 < 2;
    if (!isLt1M) {
        message.error('2MB以上のファイルはアップロードできません');
    }
    return isJpgOrPng && isLt1M;
}

export default class CoverImageUploader extends React.Component {
    state = {
        loading: false,
    };

    customUpload = async ({ onError, onSuccess, file }) => {
        this.setState({ loading: true });
        const firebase = getFirebase();

        const metadata = {
            contentType: file.type
        }

        const storageRef = await firebase.storage().ref()

        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                message.error("エラーが発生しました。ログインが必要です。", 10)
            } else {
                const fileName = 'article-cover-' + uuidv4();
                const imgFile = storageRef.child(`user/${user.uid}/${fileName}.png`)

                try {
                    const image = await imgFile.put(file, metadata);
                    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + image.metadata.bucket + "/o/" + encodeURIComponent(image.metadata.fullPath) + "?alt=media";
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
        this.props.onComplete('');
    }

    render() {
        return (
            <>
                {this.props.imageUrl ?
                    <>
                        <div style={{ padding: '0px', textAlign: 'center' }}>
                            <ThumbnailImage imageUrl={this.props.imageUrl} />
                            <Button style={{ marginTop: '12px' }} onClick={this.removeImage}><Icon type="delete" /> 削除する</Button>
                        </div>
                    </>
                    :
                    <Spin spinning={this.state.loading} tip="アップロード中です" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                        <Empty description="画像設定なし" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{}} >
                            <Upload
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                customRequest={this.customUpload}
                            >
                                <Button><Icon type='upload' /> アップロード</Button>
                            </Upload>
                        </Empty>
                    </Spin>
                }
            </>
        );
    }
}