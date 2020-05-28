import React from 'react'
import { Table } from 'antd';
import MarkdownRender from 'utils/markdown/markdown-renderer'

const columns = [
    {
        title: '表示結果',
        dataIndex: 'input',
        key: 'output',
        render: text => <div className="book-page-body" dangerouslySetInnerHTML={{ __html: MarkdownRender.render(text) }} ></div>
    },
    {
        title: '書き方',
        dataIndex: 'input',
        key: 'input',
    },
];

const data = [
    { key: '1', input: `**太字** もしくは __太字__` },
    { key: '2', input: `*イタリック*` },
    { key: '3', input: `~~打ち消し線~~` },
    { key: '4', input: `上付き文字 19^th^` },
    { key: '5', input: `下付き文字 H~2~O` },
    { key: '6', input: `++下線++` },
    { key: '7', input: `==蛍光色==` },
    { key: '8', input: `\`インラインコード\`` },
    { key: '9', input: `[リンク](http://boosty.jp)` },
];

const EmphasisHelp = () => {
    return (
        <Table columns={columns} dataSource={data} bordered pagination={false} showSorterTooltip={false} />
    )
};

export default EmphasisHelp;