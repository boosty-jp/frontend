import React from 'react'
import { Table, Typography } from 'antd';
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
        dataIndex: ['input', 'isCode'],
        key: 'input',
        width: 400,
        render: (text, record) => {
            return (
                <>
                    <div className="book-page-body" style={{ whiteSpace: 'pre-line', wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.input}</div>
                    {record.isCode &&
                        <>
                            <p style={{ marginBottom: '8px' }}>※ コードの装飾オプションは以下のとおりです。</p>
                            <Typography.Text code>言語:ファイル名:始まりの行番号:ハイライトする行番号</Typography.Text>
                            <p style={{ marginBottom: '8px' }}>ハイライトする行番号は<Typography.Text code>,</Typography.Text>区切りで複数指定できます。</p>
                        </>
                    }
                </>
            )
        }
    },
];

const code = `\`\`\`js:index.js:1:1-3,6,10
var hoge = function (hoge) {
    return hoge++;
};

var foo = function (foo) {
    return foo++;
};

var piyo = function (piyo) {
    return piyo++;
};
\`\`\``;

const img = `![画像の説明](https://wever.co.jp/static/046b489b9ee653fba25b48ee7523ebe2/ee604/boosty-logo.png)`;

const table = `| 左寄せ | 右寄せ | 中央 |
|:------ | ------:| ------ |
| 左寄せ1 | 右寄せ1 | 中央1 |
| 左寄せ2 | 右寄せ2 | 中央2 |
| 左寄せ3 | 右寄せ3 | 中央3 |
`;
const ContentHelp = () => {
    return (
        <Table columns={columns} dataSource={data} bordered pagination={false} style={{ width: '100%' }} showSorterTooltip={false} />
    )
};

const data = [
    { key: '1', input: img, isCode: false },
    { key: '2', input: table, isCode: false },
    { key: '4', input: code, isCode: true },
];

export default ContentHelp;