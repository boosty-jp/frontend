import React from 'react';
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Drawer, Button, Col, Row, Input, notification, List, Icon } from 'antd';
import styled from 'styled-components'
import uuidv4 from 'uuid/v4'
import { addSection } from 'modules/course/edit/sections'

const searchResults = [
    { id: '1', publishDate: '1日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '2', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '3', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '4', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '5', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { id: '6', publishDate: '2日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { id: '7', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { id: '8', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { id: '9', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { id: '10', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { id: '11', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { id: '12', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { id: '13', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { id: '14', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
]

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 500rem;
  }
`;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


class SectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    state = {
        visible: false,
        title: '',
        articles: [],
    };

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedArticles = reorder(
            this.state.articles,
            result.source.index,
            result.destination.index
        );

        this.setState({ articles: reorderedArticles });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            title: '',
            articles: []
        });
    };

    addArticle = (item) => {
        if (this.state.articles.length > 9) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    '1つのセクションに追加できる記事数は10までです。',
            });
            return;
        }
        if (this.alreadyExists(item)) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    '同じ記事をセクションに追加することはできません。',
            });
            return;
        }
        this.setState({ articles: [...this.state.articles, item] })
    }

    alreadyExists = (item) => {
        const articles = this.state.articles;
        for (let i = 0; i < articles.length; ++i) {
            if (articles[i].id === item.id) {
                return true;
            }
        }
        return false;
    }

    deleteArticle = (id) => {
        const articles = this.state.articles.concat();
        let idx = -1;
        for (let i = 0; i < articles.length; ++i) {
            if (articles[i].id === id) {
                idx = i;
            }
        }

        if (idx >= 0) {
            articles.splice(idx, 1)
            this.setState({ articles: articles });
        }
    }

    addSection = () => {
        if (!this.state.title.match(/\S/g)) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    'セクション名を入力してください',
            });
            return;
        }

        if (this.state.title.length > 60) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    'セクション名は60文字以内にしてください',
            });
            return;
        }

        if (!this.state.articles.length) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    '記事を追加してください',
            });
            return;
        }

        if (this.props.sections.length > 20) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    '1つのコースに追加できるセクションは20までです',
            });
            return;
        }

        this.props.addSection({ id: uuidv4(), title: this.state.title, articles: this.state.articles })
        this.onClose();
    }

    render() {
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
                    <p style={{ fontSize: '16px', fontWeight: '500' }}>セクション名</p>
                    <Input value={this.state.title} size="large" placeholder="セクション名を入力してください" onChange={(e) => { this.setState({ title: e.target.value }) }} />
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
                                        <Button onClick={() => { this.addArticle(item) }}><Icon type="plus" /></Button>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <p style={{ fontSize: '16px', fontWeight: '500' }}>記事一覧</p>
                            {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {this.state.articles.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    userSelect: "none",
                                                                    padding: 2,
                                                                    margin: `0 0 8px 0`,
                                                                    ...provided.draggableProps.style
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        padding: '12px 16px',
                                                                        borderRadius: '0.25rem',
                                                                        border: '1px solid #d9d9d9',
                                                                        // color: snapshot.isDragging ? 'red' : 'blue',
                                                                        backgroundColor: '#fafafa'
                                                                    }}
                                                                >
                                                                    <Row gutter={[8, 8]} style={{ verticalAlign: 'middle' }}>
                                                                        <Col span={20} style={{ textAlign: 'left' }}>
                                                                            {index + 1}. {item.title}
                                                                        </Col>
                                                                        <Col span={4} style={{ textAlign: 'right' }}>
                                                                            <Icon type="delete" onClick={() => { this.deleteArticle(item.id) }} />
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </DragDropContext>
                        </Col>
                    </Row>
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
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>キャンセル</Button>
                        <Button onClick={this.addSection} type="primary">追加する</Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    sections: state.courseEditSections.sections,
})

const mapDispatchToProps = dispatch => ({
    addSection: (section) => dispatch(addSection(section)),
})

const SectionAddForm = connect(mapStateToProps, mapDispatchToProps)(SectionForm)
export default SectionAddForm