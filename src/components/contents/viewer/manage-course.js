import React from "react"
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { withApollo } from 'react-apollo'
import { Table, Divider, Badge, message, Icon, Popconfirm } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'gatsby';
import { createCourseEditLink, createCourseDetailLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
import { getCondition } from "utils/search-condition";

const GET_COURSE_LIST = gql`
  query CreatedCoursesBySelf($searchCondition: SearchCondition) {
    createdCoursesBySelf(condition: $searchCondition) {
      courses{
        id
        title
        status
        createDate
        updateDate

        actionCount {
          likeCount
          learnedCount
        }
      }
      sumCount
    }
  }
`;

const DELETE_COURSE = gql`
mutation DeleteCourse($courseId: ID!) {
  deleteCourse(courseId: $courseId)
}
`;


class ManageCourses extends React.Component {
    state = {
        loading: false,
        courses: [],
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
                query: GET_COURSE_LIST,
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
        const courses = data.createdCoursesBySelf.courses.map(a => {
            return {
                id: a.id,
                key: a.id,
                title: { id: a.id, title: a.title },
                like: a.actionCount.likeCount,
                learned: a.actionCount.learnedCount,
                status: a.status,
                createTime: parseInt(a.createDate, 10),
                updateTime: parseInt(a.updateDate, 10),
            }
        });
        this.setState({ courses, sumCount: data.createdCoursesBySelf.sumCount });
    }

    delete = async (id) => {
        try {
            this.setState({ loading: true })
            await this.props.client.mutate({
                mutation: DELETE_COURSE,
                variables: { courseId: id }
            });
            const ids = this.state.courses.map(a => { return a.id });
            const newCourses = this.state.courses.concat();
            const idx = ids.indexOf(id);
            newCourses.splice(idx, 1);
            this.setState({ courses: newCourses })
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
                dataIndex: 'title',
                render: (data) => {
                    return (
                        <Link to={createCourseDetailLink(data.id)}>{data.title}</Link>
                    )
                }
            },
            {
                title: 'ステータス',
                key: 'status',
                dataIndex: 'status',
                filters: [
                    {
                        text: '公開',
                        value: 'publish',
                    },
                    {
                        text: '下書き',
                        value: 'draft',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => {
                    return record.status === value
                },
                sorter: (a, b) => a.status.length - b.status.length,
                sortDirections: ['descend', 'ascend'],
                render: (status) => {
                    const text = status === 'draft' ? '下書き' : '公開';
                    if (text === '公開') return <><Badge color="cyan" />{text}</>
                    return <><Badge color="grey" />{text}</>
                }
            },
            {
                title: 'いいね数',
                key: 'like',
                dataIndex: 'like',
                sortDirections: ['descend', 'ascend'],
                sorter: (a, b) => a.like - b.like,
            },
            {
                title: '学習済み数',
                key: 'learned',
                dataIndex: 'learned',
                sortDirections: ['descend', 'ascend'],
                sorter: (a, b) => a.learned - b.learned,
            },
            {
                title: '更新日',
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
                dataIndex: 'id',
                key: 'manage',
                render: (id) => {
                    return (
                        <>
                            <Link to={createCourseEditLink(id)}><Icon type="edit" style={{ marginRight: '8px' }} />編集</Link>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="本当に削除しますか？"
                                okText="削除"
                                cancelText="キャンセル"
                                onConfirm={() => this.delete(id)}
                            >
                                <a href="#" ><Icon type="delete" style={{ marginRight: '8px' }} />削除</a>
                            </Popconfirm>
                        </>
                    )
                },
            },
        ];

        return (
            <Query
                query={GET_COURSE_LIST}
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
                            dataSource={this.state.courses}
                            loading={this.state.loading}
                            bordered
                            scroll={{ x: 800 }}
                            pagination={{
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '30', '50'],
                                total: this.state.sumCount,
                            }}
                            onChange={this.onChange}
                        />
                    )
                }}
            </Query>
        )
    }
}

export default withApollo(ManageCourses)