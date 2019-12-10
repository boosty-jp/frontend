import React from "react"
import { Table, Divider, Badge } from 'antd';

const columns = [
    {
        title: 'タイトル',
        key: 'title',
        dataIndex: 'title',
    },
    {
        title: 'ステータス',
        key: 'status',
        dataIndex: 'status',
        filters: [
            {
                text: '公開',
                value: '公開',
            },
            {
                text: '下書き',
                value: '下書き',
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
        title: 'いいね数',
        key: 'like',
        dataIndex: 'like',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.like - b.like,
    },
    {
        title: '学習済み数',
        key: 'learned',
        dataIndex: 'learned',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.learned - b.learned,
    },
    {
        title: '更新日',
        key: 'updateTime',
        dataIndex: 'updateTime',
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
        key: 'manage',
        render: (id) => (
            <>
                <a>編集</a>
                <Divider type="vertical" />
                <a>削除</a>
            </>
        ),
    },
];

const data = [
    {
        key: '1',
        title: 'Java11を基礎から学ぶ',
        like: 32,
        learned: 2,
        status: '下書き',
        updateTime: 1575891837
    },
    {
        key: '2',
        title: 'Spring Boot2アップデートを学ぶ',
        like: 384,
        learned: 99,
        status: '公開',
        updateTime: 1575991837
    },
    {
        key: '3',
        title: 'Javascript APIを極める',
        like: 23,
        learned: 44,
        status: '公開',
        updateTime: 1575801837
    },
    {
        key: '4',
        title: 'React Redux入門',
        like: 1,
        learned: 29,
        status: '下書き',
        updateTime: 1575892837
    },
];

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

const ManageCourse = () => (
    <Table columns={columns} dataSource={data} onChange={onChange} bordered scroll={{ x: 800 }} />
)

export default ManageCourse