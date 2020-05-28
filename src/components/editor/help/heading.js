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
    { key: '1', input: `# 見出し1` },
    { key: '2', input: `## 見出し2` },
    { key: '3', input: `### 見出し3` },
    { key: '4', input: `#### 見出し4` },
    { key: '5', input: `##### 見出し5` },
    { key: '6', input: `##### 見出し6` },
];

const HeadingHelp = () => {
    return (
        <Table columns={columns} dataSource={data} bordered pagination={false} showSorterTooltip={false} />
    )
};

export default HeadingHelp;