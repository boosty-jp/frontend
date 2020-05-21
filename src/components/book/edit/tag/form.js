import React from "react"
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Form, Tooltip, message, Button, Tag, Input } from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";
import { PlusOutlined } from '@ant-design/icons';

const UPDATE_BOOK_TAGS = gql`
mutation updateBookTags($bookId: ID!, $tags: [String]!){
  updateBookTags(bookId: $bookId, tags: $tags)
}
`;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

class BookEditTagForm extends React.Component {
    state = {
        loading: false,
        tags: this.props.tags,
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    };

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue.toLowerCase()) === -1) {
            tags = [...tags, inputValue.toLowerCase()];
        }

        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value.toLowerCase() });
    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    saveInputRef = input => (this.input = input);

    saveEditInputRef = input => (this.editInput = input);

    updateTags = async () => {
        if (this.state.tags.length > 5) {
            message.error('設定できるタグは5つまでです');
            return;
        }

        this.setState({ loading: true })
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_TAGS,
                variables: {
                    bookId: this.props.id,
                    tags: this.state.tags
                }
            });
            message.success("更新しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        return (
            <>
                <Form {...layout}>
                    <Form.Item
                        label={
                            <span>タグ&nbsp;
                                <Tooltip title="本のカテゴライズに用いられます。最大5つまで入力できます">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>}
                    >
                        <div>
                            {tags.map((tag, index) => {
                                if (editInputIndex === index) {
                                    return (
                                        <Input
                                            ref={this.saveEditInputRef}
                                            key={tag}
                                            size="small"
                                            className="tag-input"
                                            value={editInputValue}
                                            onChange={this.handleEditInputChange}
                                            onBlur={this.handleEditInputConfirm}
                                            onPressEnter={this.handleEditInputConfirm}
                                        />
                                    );
                                }

                                const isLongTag = tag.length > 20;

                                const tagElem = (
                                    <Tag
                                        className="edit-tag"
                                        key={tag}
                                        closable={true}
                                        onClose={() => this.handleClose(tag)}
                                    >
                                        <span
                                            onDoubleClick={e => {
                                                this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                                    this.editInput.focus();
                                                });
                                                e.preventDefault();
                                            }}
                                        >
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                        </span>
                                    </Tag>
                                );
                                return isLongTag ? (
                                    <Tooltip title={tag} key={tag}>
                                        {tagElem}
                                    </Tooltip>
                                ) : (
                                        tagElem
                                    );
                            })}
                            <div style={{ marginTop: this.state.tags.length === 0 ? '0px' : '10px' }}>
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                        style={{ width: '200px' }}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag
                                        size="large"
                                        onClick={this.showInput}
                                        style={{ borderStyle: 'dashed', background: '#FFF' }}
                                    >
                                        <PlusOutlined /> タグを追加する
                                    </Tag>
                                )}
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" onClick={this.updateTags} loading={this.state.loading} >更新する</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default withApollo(BookEditTagForm)