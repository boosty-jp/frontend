import React from 'react';
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Drawer, Form, Button, Col, Row, Input, notification, List, Icon } from 'antd';
import styled from 'styled-components'
import { addArticle, setSection, updateTitle, updateArticles, deleteArticle, clearSection } from 'modules/course/edit/section'
import { updateSection } from 'modules/course/edit/sections'

const searchResults = [
    { skills: [{ id: 's-1', level: 1, name: 'Java' }], id: '1', publishDate: '1日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { skills: [{ id: 's-1', level: 2, name: 'Java' }], id: '2', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { skills: [{ id: 's-1', level: 3, name: 'Java' }], id: '3', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { skills: [{ id: 's-2', level: 1, name: 'Python' }], id: '4', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { skills: [{ id: 's-2', level: 2, name: 'Python' }], id: '5', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { skills: [{ id: 's-2', level: 3, name: 'Python' }], id: '6', publishDate: '2日前', learned: 20, like: 23, title: 'Java11の新文法を理解する', image: 'https://cdn.freebiesupply.com/logos/thumbs/2x/java-logo.png' },
    { skills: [{ id: 's-3', level: 1, name: 'React' }], id: '7', publishDate: '1日前', learned: 20, like: 23, title: 'Ruby on Railsでアプリケーションを作る', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Devicon-ruby-plain-wordmark.svg/512px-Devicon-ruby-plain-wordmark.svg.png' },
    { skills: [{ id: 's-3', level: 2, name: 'React' }], id: '8', publishDate: '1日前', learned: 20, like: 23, title: 'C++のコアな関数の中身を読み解く', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png' },
    { skills: [{ id: 's-3', level: 3, name: 'React' }], id: '9', publishDate: '1日前', learned: 20, like: 23, title: 'ReactとReduxで作成するモダンなフロントエンド環境', image: 'https://ja.reactjs.org/logo-og.png' },
    { skills: [{ id: 's-4', level: 1, name: 'Ruby' }], id: '10', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { skills: [{ id: 's-4', level: 2, name: 'Ruby' }], id: '11', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
    { skills: [{ id: 's-4', level: 3, name: 'Ruby' }], id: '12', publishDate: '1日前', learned: 20, like: 2303, title: 'javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
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


class DrawerForm extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    state = {
        visible: false,
    };

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedArticles = reorder(
            this.props.articles,
            result.source.index,
            result.destination.index
        );

        this.props.updateArticles(reorderedArticles);
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.props.setSection(this.props.section);
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.clearSection();
    };

    addArticle = (item) => {
        if (this.props.articles.length > 9) {
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
        this.props.addArticle(item)
    }

    alreadyExists = (item) => {
        const articles = this.props.articles;
        for (let i = 0; i < articles.length; ++i) {
            if (articles[i].id === item.id) {
                return true;
            }
        }
        return false;
    }

    updateSection = () => {
        if (!this.props.title.match(/\S/g)) {
            notification['error']({
                message: '更新に失敗しました',
                description:
                    'セクション名を入力してください',
            });
            return;
        }

        if (this.props.title.length > 60) {
            notification['error']({
                message: '更新に失敗しました',
                description:
                    'セクション名は60文字以内にしてください',
            });
            return;
        }

        if (!this.props.articles.length) {
            notification['error']({
                message: '更新に失敗しました',
                description:
                    '記事を追加してください',
            });
            return;
        }

        this.props.updateSection({ id: this.props.section.id, title: this.props.title, articles: this.props.articles })
        this.onClose();
    }

    render() {
        return (
            <>
                <Icon type="edit" onClick={this.showDrawer} />
                <Drawer
                    title="セクションを更新する"
                    width={900}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <p style={{ fontSize: '16px', fontWeight: '500' }}>セクション名</p>
                    <Input value={this.props.title} size="large" placeholder="セクション名を入力してください" onChange={(e) => { this.props.updateTitle(e.target.value) }} />
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
                                                {this.props.articles.map((item, index) => (
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
                                                                            <Icon type="delete" onClick={() => { this.props.deleteArticle(item.id) }} />
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
                        <Button onClick={this.updateSection} type="primary">更新する</Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

const SectionForm = Form.create()(DrawerForm);

const mapStateToProps = state => ({
    title: state.courseEditSection.title,
    articles: state.courseEditSection.articles,
})

const mapDispatchToProps = dispatch => ({
    setSection: (section) => dispatch(setSection(section)),
    updateTitle: (title) => dispatch(updateTitle(title)),
    addArticle: (article) => dispatch(addArticle(article)),
    updateArticles: (articles) => dispatch(updateArticles(articles)),
    deleteArticle: (id) => dispatch(deleteArticle(id)),
    clearSection: () => dispatch(clearSection()),
    updateSection: (section) => dispatch(updateSection(section)),
})

const SectionUpdateForm = connect(mapStateToProps, mapDispatchToProps)(SectionForm)
export default SectionUpdateForm