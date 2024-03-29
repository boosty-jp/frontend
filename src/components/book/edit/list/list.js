import React from "react"
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { withApollo } from 'react-apollo'
import { Table, Divider, Badge, message, Popconfirm, Tooltip } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'gatsby';
import { createBookEditLink, createBookDetailLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
import { getCondition } from "utils/search-condition";
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined, CheckCircleTwoTone } from '@ant-design/icons'

const GET_BOOK_LIST = gql`
  query CreatedBooksBySelf($searchCondition: SearchCondition) {
    createdBooksBySelf(condition: $searchCondition) {
      books {
        id
        title
        imageUrl
        status
        meaningful
        purchasedCount
        createDate
        updateDate
      }
      sumCount
    }
  }
`;

const DELETE_BOOK = gql`
mutation DeleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId)
}
`;


class EditableBookList extends React.Component {
    state = {
        loading: false,
        books: [],
        sumCount: 0,
        condition: {
            filter: "",
            sortField: "",
            sortOrder: "updateTime",
            page: 1,
            resultCount: 10,
        },
    }

    onChange = async (page, filters, sorter) => {
        try {
            this.setState({ loading: true, });
            const { data } = await this.props.client.query({
                query: GET_BOOK_LIST,
                variables: {
                    searchCondition: getCondition(page, filters, sorter),
                }
            });
            this.setResults(data);
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false });
    }

    setResults = (data) => {
        const books = data.createdBooksBySelf.books.map(a => {
            return {
                id: a.id,
                key: a.id,
                title: {
                    id: a.id,
                    image: a.imageUrl,
                    title: a.title ? a.title : "タイトル未設定",
                },
                purchasedCount: a.purchasedCount ? a.purchasedCount : 0,
                status: {
                    status: a.status,
                    meaningful: a.meaningful
                },
                action: {
                    id: a.id,
                    status: a.status,
                },
                createTime: parseInt(a.createDate, 10),
                updateTime: parseInt(a.updateDate, 10),
            }
        });
        this.setState({ books, sumCount: data.createdBooksBySelf.sumCount });
    }

    delete = async (id) => {
        try {
            this.setState({ loading: true })
            await this.props.client.mutate({
                mutation: DELETE_BOOK,
                variables: { bookId: id }
            });
            const ids = this.state.books.map(a => { return a.id });
            const newBooks = this.state.books.concat();
            const idx = ids.indexOf(id);
            newBooks.splice(idx, 1);
            this.setState({ books: newBooks })
            message.success('削除しました', 7)
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false })
    }

    render() {
        const columns = [
            {
                title: 'タイトル',
                key: 'title',
                width: '340px',
                dataIndex: 'title',
                render: (data) => <Link to={createBookDetailLink(data.id)}>{data.title}</Link>
            },
            {
                title: 'ステータス',
                key: 'status',
                width: '150px',
                dataIndex: 'status',
                filters: [
                    {
                        text: '公開中',
                        value: 'publish',
                    },
                    {
                        text: '下書き',
                        value: 'draft',
                    },
                    {
                        text: '公開停止',
                        value: 'suspend',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => {
                    return record.status === value
                },
                sorter: (a, b) => a.status.length - b.status.length,
                sortDirections: ['descend', 'ascend'],
                render: (status) => {
                    if (status.status === 'publish') {
                        if (!status.meaningful) return <><Badge status="processing" />公開中</>
                        return <><Badge status="processing" />公開中 <CheckCircleTwoTone style={{ marginLeft: '4px', color: '#1890ff' }} /></>
                    }
                    if (status.status === 'draft') return <><Badge status="default" />下書き</>
                    if (status.status === 'suspend') return <><Badge status="error" />公開停止</>
                    return <></>
                }
            },
            {
                title: '読者数',
                width: '110px',
                key: 'purchasedCount',
                dataIndex: 'purchasedCount',
                sortDirections: ['descend', 'ascend'],
                sorter: (a, b) => a.purchasedCount - b.purchasedCount,
            },
            {
                title: '更新日',
                width: '160px',
                key: 'updateTime',
                dataIndex: 'updateTime',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.updateTime - b.updateTime,
                render: (time) => {
                    const dateTime = new Date(time);
                    return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString('ja-JP');
                }
            },
            {
                title: '操作',
                width: '100px',
                dataIndex: 'action',
                key: 'manage',
                render: (data) => {
                    let deleteButton = <></>;
                    if (data.status === 'draft') {
                        deleteButton = (
                            <>
                                <Divider type="vertical" />
                                <Tooltip placement="left" title="削除">
                                    <Popconfirm
                                        title="本当に削除しますか？"
                                        okText="削除"
                                        cancelText="キャンセル"
                                        onConfirm={() => this.delete(data.id)}
                                        icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                                    >
                                        <a href="/#" ><DeleteOutlined style={{ marginRight: '8px' }} /></a>
                                    </Popconfirm>
                                </Tooltip></>
                        );
                    }
                    return (
                        <>
                            <Tooltip placement="left" title="編集">
                                <Link to={createBookEditLink(data.id)}><EditOutlined style={{ marginRight: '8px' }} /></Link>
                            </Tooltip>
                            {deleteButton}
                        </>
                    )
                },
            },
        ];

        return (
            <Query
                query={GET_BOOK_LIST}
                variables={{
                    searchCondition: {
                        filter: "",
                        sortField: "",
                        sortOrder: "updateTime",
                        page: 1,
                        resultCount: 10,
                    }
                }}
                onCompleted={this.setResults}
            >
                {({ loading, error }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    return (
                        <Table
                            columns={columns}
                            dataSource={this.state.books}
                            loading={this.state.loading}
                            bordered
                            scroll={{ x: 400 }}
                            pagination={{
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '30', '50'],
                                total: this.state.sumCount,
                            }}
                            onChange={this.onChange}
                            showSorterTooltip={false}
                        />
                    )
                }}
            </Query>
        )
    }
}

export default withApollo(EditableBookList)