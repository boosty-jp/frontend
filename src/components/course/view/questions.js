import React from "react"
import { Table, Divider, Badge } from 'antd';

const columns = [
    {
        title: 'タイトル',
        key: 'title',
        width: 250,
        dataIndex: 'title',
    },
    {
        title: '状態',
        key: 'status',
        width: 100,
        dataIndex: 'status',
        filters: [
            {
                text: '正解',
                value: '正解',
            },
            {
                text: '不正解',
                value: '不正解',
            },
            {
                text: '未回答',
                value: '未回答',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        sorter: (a, b) => a.status.length - b.status.length,
        sortDirections: ['descend', 'ascend'],
        render: (text) => {
            if (text === '公開') return <><Badge color="cyan" />{text}</>
            return <><Badge color="grey" />{text}</>
        }
    },
    {
        title: '回答日',
        key: 'solvedTime',
        width: 100,
        dataIndex: 'solvedTime',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.updateTime - b.updateTime,
        render: (unixTime) => {
            const dateTime = new Date(unixTime * 1000);
            return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString('ja-JP');
        }
    },
    {
        title: '操作',
        dataIndex: 'title',
        width: 140,
        key: 'manage',
        render: (id) => (
            <>
                <a>解答</a>
                <Divider type="vertical" />
                <a>復習</a>
            </>
        ),
    },
];

const data = [
    {
        key: '1',
        title: 'for文',
        status: '正解',
        solvedTime: 1575891837
    },
    {
        key: '1',
        title: 'Loop文',
        status: '不正解',
        solvedTime: 1575891837
    },
    {
        key: '1',
        title: 'test',
        status: '不正解',
        solvedTime: 1575891837
    },
];

const Questions = () => (
    <Table columns={columns} dataSource={data} bordered pagination={false} />
)

export default Questions