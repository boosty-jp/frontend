import React from 'react';
import { Empty, Drawer, Form, Button, Col, Row, Input, Select, List, Icon, AutoComplete } from 'antd';
import styled from 'styled-components'

const searchResults = [
    { id: '1', publishDate: '1日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '2', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '3', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '4', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '5', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
]

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 500rem;
  }
`;


class DrawerForm extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Button type="primary" onClick={this.showDrawer} style={{ width: '100%' }}><Icon type="plus" /> 追加する</Button>
                <Drawer
                    title="セクションを追加する"
                    width={900}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item label={<p style={{ fontSize: '16px', fontWeight: '500' }}>セクション名</p>}>
                            {getFieldDecorator('sectionName', {
                                rules: [{ required: true, message: '入力してください' }],
                            })(<Input size="large" placeholder="セクション名を入力してください" />)}
                        </Form.Item>
                        <Row gutter={16} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <p style={{ fontSize: '16px', fontWeight: '500' }}>記事を追加する</p>
                                <RoundSearch
                                    placeholder="検索する"
                                    onSearch={value => console.log(value)}
                                    onChange={e => console.log(e.target.value)}
                                    style={{ width: "100%", height: 32, marginBottom: '10px' }}
                                />
                                <List
                                    dataSource={searchResults}
                                    renderItem={item => (
                                        <List.Item key={item.id} style={{ padding: '4px 0' }}>
                                            <List.Item.Meta title={<a href="https://ant.design">{item.title}</a>} />
                                            <Button><Icon type="plus" /></Button>
                                        </List.Item>
                                    )}
                                />
                            </Col>
                            <Col span={12}>
                                <p style={{ fontSize: '16px', fontWeight: '500' }}>記事一覧</p>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
            </Button>
                        <Button onClick={this.onClose} type="primary">
                            Submit
            </Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

const SectionForm = Form.create()(DrawerForm);
export default SectionForm