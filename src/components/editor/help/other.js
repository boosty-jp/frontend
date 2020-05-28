import React from 'react'
import { Table } from 'antd';
import MarkdownRender from 'utils/markdown/markdown-renderer'

const columns = [
    {
        title: '表示結果',
        dataIndex: 'input',
        key: 'output',
        width: 400,
        render: text => <div className="book-page-body" dangerouslySetInnerHTML={{ __html: MarkdownRender.render(text) }} style={{ padding: '10px', wordWrap: 'break-word', margin: "0px !important", wordBreak: 'break-word' }}></div>
    },
    {
        title: '書き方',
        dataIndex: 'input',
        key: 'input',
        width: 400,
        render: text => <div className="book-page-body" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</div>
    },
];


const horizon = `水平線
___
もしくは
***`;

const quote = `> 引用1
> > 引用2
> > > 引用3`;

const noOrderedList = `+ リスト \`+ \`, \` - \`, \` * \` のどれかで記載できます
+ リスト1
  - リスト1-1
    * リスト1-1-1
    + リスト1-1-2
    - リスト1-1-3
+ リスト2`;

const orderedList = `1. リスト1
2. リスト2
3. リスト3
`

const description = `補足
"補足説明したい単語"です。

*[補足説明したい単語]: 補足説明`;

const data = [
    { key: '1', input: horizon },
    { key: '2', input: quote },
    { key: '3', input: noOrderedList },
    { key: '4', input: orderedList },
    { key: '5', input: description },
];

const OtherHelp = () => {
    return (
        <Table columns={columns} dataSource={data} bordered pagination={false} style={{ width: '100%' }} showSorterTooltip={false} />
    )
};


export default OtherHelp;