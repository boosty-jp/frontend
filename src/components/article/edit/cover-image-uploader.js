import React from "react"
import { Upload, Icon, message, Tooltip } from 'antd';
import styled from 'styled-components'

const CustomUploader = styled(Upload)`
    .ant-upload.ant-upload-select-picture-card {
        width: 100%;
        height: 150px;
        margin-top: 10px;
    }
`;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
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

export default class CoverImageUploader extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">アップロード</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <>
                <span style={{ fontWeight: '400', fontSize: '16px' }}>カバー画像&nbsp;
                    <Tooltip title="1MB以下の画像を投稿できます">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                <CustomUploader
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="記事のカバー画像" style={{ height: '100%' }} /> : uploadButton}
                </CustomUploader>
            </>
        );
    }
}