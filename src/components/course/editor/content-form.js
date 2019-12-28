import React from 'react';
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AutoComplete, Col, Row, notification, Empty, Icon } from 'antd';
import styled from 'styled-components'
import debounce from "lodash/debounce";
import algoliasearch from 'algoliasearch/lite';
import { addArticle, updateArticles, deleteArticle } from 'modules/course/edit/section'
import MiniThumbnailImage from 'components/image/mini-thumbnail';

const { Option, OptGroup } = AutoComplete;

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const index = searchClient.initIndex('article')

const RoundSearch = styled(AutoComplete)`
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


class ContentFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.fetchArticles = debounce(this.fetchArticles, 300);
    }

    state = {
        open: false,
        fetching: false,
        inputVal: '',
        searchResults: [],
    };

    fetchArticles = value => {
        value = value.replace(/\s+/g, "");
        if (value.length === 0) {
            //空白文字のときは何も表示しない
            this.setState({ fetching: false, searchResults: [] })
            return;
        }

        this.setState({ searchResults: [], fetching: true, open: true });

        let searchResults = []
        index.search({ query: value, hitsPerPage: 8 }).then(({ hits }) => {
            searchResults[0] = (
                <OptGroup key="skill-search-result" label="検索結果" >
                    {hits.map(s => {
                        const updateDateObject = new Date(s.updateDate);
                        const updateDateStr = updateDateObject.getFullYear() + "年" + (updateDateObject.getMonth() + 1) + "月" + updateDateObject.getDate() + "日";
                        return (
                            <Option key={s.objectID} value={s.title} >
                                <Row align="middle" type="flex" justify="space-between">
                                    <Col span={20}>
                                        <p style={{ fontWeight: '500', fontSize: '14px', marginBottom: '2px' }}>{s.title}</p>
                                        <p style={{ fontSize: '12px', color: 'grey', marginBottom: '2px' }}>更新日: {updateDateStr}</p>
                                    </Col>
                                    <Col span={4} >
                                        <MiniThumbnailImage imageUrl={s.imageUrl} />
                                    </Col>
                                </Row>
                            </Option>
                        )
                    })}
                </OptGroup>)

            this.setState({ fetching: false, searchResults })
        }).catch(() => {
            searchResults[0] = (<></>);

            this.setState({ fetching: false, searchResults })
        })
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

        this.props.addArticle(item);
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

    render() {
        return (
            <>
                <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                    <RoundSearch
                        size="large"
                        dropdownStyle={{ width: 300 }}
                        placeholder="検索する"
                        onSearch={(value) => {
                            this.setState({ inputVal: value });
                            this.fetchArticles(value);
                        }}
                        dataSource={this.state.searchResults}
                        optionLabelProp="value"
                        value={this.state.inputVal}
                        onSelect={(value, option) => {
                            this.addArticle({ id: option.key, title: value });
                            this.setState({ inputVal: '' })
                        }}
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ textAlign: 'center', margin: '12px auto' }}>
                    <Icon type="double-left" rotate={270} />
                </div>
                {this.props.articles.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="データがありません" />}
                <DragDropContext onDragEnd={this.onDragEnd} >
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
            </>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.courseEditSection.articles,
})

const mapDispatchToProps = dispatch => ({
    addArticle: (article) => dispatch(addArticle(article)),
    deleteArticle: (article) => dispatch(deleteArticle(article)),
    updateArticles: (articles) => dispatch(updateArticles(articles)),
})

const ContentForm = connect(mapStateToProps, mapDispatchToProps)(ContentFormComponent)
export default ContentForm