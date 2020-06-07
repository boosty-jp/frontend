import React from "react"
import { connect } from 'react-redux'
import { Button, Empty, Upload, message, Spin } from 'antd';
import { Stage, Layer, Text, Rect } from 'react-konva';
import ThumbnailImage from "components/image/thumbnail";
import getFirebase from "utils/firebase";
import uuidv4 from 'uuid/v4'
import { UploadOutlined, LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import ImageCanvas from "components/book/edit/cover-generator/image-canvas";
import OGP_BASE from "images/ogp_base.png"
import OGP_LOGO from "images/ogp_logo.png"
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('「jpeg」もしくは「png」拡張子以外はアップロードできません');
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
        message.error('3MB以上のファイルはアップロードできません');
    }
    return isJpgOrPng && isLt3M;
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const UPDATE_BOOK_IMAGE = gql`
mutation updateBookCoverImage($bookId: ID!, $imageUrl: String!){
  updateBookCoverImage(bookId: $bookId, imageUrl: $imageUrl)
}
`;

class BookCoverImageUploaderComponent extends React.Component {
    state = {
        uploadLoading: false,
        updateLoading: false,
        isUpdated: false,
        ogpImageUrl: '',
    };

    customUpload = async ({ onError, onSuccess, file }) => {
        this.setState({ uploadLoading: true });
        const firebase = getFirebase();

        const metadata = {
            contentType: file.type
        }

        const storageRef = await firebase.storage().ref()

        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                message.error("エラーが発生しました。ログインが必要です。", 10)
            } else {
                try {
                    const fileName = 'book-cover-' + uuidv4();
                    const imgFile = storageRef.child(`user/${user.uid}/${fileName}.png`)
                    const image = await imgFile.put(file, metadata);

                    this.setState({ image: await getBase64(file), ogpImageUrl: `user/${user.uid}/${fileName}_ogp.png` });
                    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + image.metadata.bucket + "/o/" + encodeURIComponent(image.metadata.fullPath) + "?alt=media";
                    this.props.onComplete(imageUrl);
                    onSuccess(null, image);
                    this.setState({ isUpdated: true });
                } catch (e) {
                    message.error("エラーが発生しました。画像の容量をご確認の上、再度お試しください。");
                    onError(e);
                }
                this.setState({ uploadLoading: false });
            }
        })
    };

    removeImage = () => {
        this.props.onComplete('');
    }

    updateImage = async () => {
        this.setState({ updateLoading: true })
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_IMAGE,
                variables: {
                    bookId: this.props.bookId,
                    imageUrl: this.props.imageUrl
                }
            });
            const self = this;
            setTimeout(async () => {
                const firebase = getFirebase();
                const storageRef = await firebase.storage().ref()
                const imgFile = storageRef.child(self.state.ogpImageUrl);
                imgFile.putString(self.stageRef.getStage().toDataURL(), 'data_url').then(snapshot => console.log(snapshot));
            }, 1000)
            message.success("更新しました", 7)
            this.setState({ isUpdated: false })
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ updateLoading: false })
    }

    render() {
        return (
            <>
                {this.props.imageUrl ?
                    <>
                        <div style={{ padding: '0px', textAlign: 'center' }}>
                            <ThumbnailImage imageUrl={this.props.imageUrl} />
                            <Button style={{ marginTop: '12px' }} onClick={this.removeImage}><DeleteOutlined /> 削除する</Button>
                        </div>
                    </>
                    :
                    <Spin spinning={this.state.uploadLoading} tip="アップロード中です" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                        <p style={{ textAlign: 'center' }}>カバー画像作成にお困りですか？<br /><a href="/cover-generator" target="_blank">テンプレート</a>からも作成できます！</p>
                        <Empty description="画像設定なし" image={Empty.PRESENTED_IMAGE_SIMPLE} >
                            <Upload
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                customRequest={this.customUpload}
                                style={{ display: 'inline' }}
                            >
                                <Button><UploadOutlined style={{ marginRight: '4px' }} />アップロード</Button>
                            </Upload>
                        </Empty>
                    </Spin>
                }
                <div hidden>
                    <Stage width={1200} height={630} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <ImageCanvas src={OGP_BASE} width={1200} height={630} x={0} y={0} />
                            <ImageCanvas src={OGP_LOGO} width={270} height={60} x={604} y={400} />
                            {this.state.image &&
                                <>
                                    <Rect x={226} y={75} width={300} height={480} fill="000000" shadowBlur={8} shadowOffsetY={2} shadowOffsetX={2}></Rect>
                                    <ImageCanvas
                                        x={226}
                                        y={75}
                                        width={300}
                                        height={480}
                                        src={this.state.image}
                                    />
                                </>
                            }
                            <Text
                                text="オンラインで"
                                align="left"
                                fontSize={70}
                                fontFamily="ヒラギノ丸ゴ Pro W4"
                                fontStyle="bold"
                                width={420}
                                x={604}
                                y={170}
                                fill="#000000"
                            />
                            <Text
                                text="技術書を読もう"
                                align="left"
                                fontSize={70}
                                fontFamily="ヒラギノ丸ゴ Pro W4"
                                fontStyle="bold"
                                width={490}
                                x={604}
                                y={268}
                                fill="#000000"
                            />
                        </Layer>
                    </Stage>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button
                        disabled={!this.state.isUpdated}
                        loading={this.state.updateLoading}
                        size="large"
                        onClick={this.updateImage}
                        shape="round"
                        type="primary"
                    >
                        更新する
                    </Button>
                </div>
            </>
        );
    }
}


const mapStateToProps = state => ({
    imageUrl: state.bookEdit.imageUrl,
})

const BookCoverImageUploader = connect(mapStateToProps)(BookCoverImageUploaderComponent)
export default withApollo(BookCoverImageUploader)