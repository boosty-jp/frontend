import React from 'react';
import { Typography, Alert, Table } from 'antd';
import hljs from 'highlight.js';
const { Title, Paragraph, Text } = Typography;


export const convertToJSX = (blocks) => {
    var jsxList = [];
    var textCount = 0;
    const countRegexp = /<[^>]*>|\s+|&nbsp;/g
    blocks.forEach(block => {
        const text = block.data.text
        switch (block.type) {
            case 'header':
                jsxList.push(<Title level={block.data.level}><span dangerouslySetInnerHTML={{ __html: text }} /></Title>)
                if (text) textCount += text.replace(countRegexp, '').length;
                break;
            case 'paragraph':
                jsxList.push(<Paragraph><span dangerouslySetInnerHTML={{ __html: text }} /></Paragraph>)
                if (text) textCount += text.replace(countRegexp, '').length;
                break;
            case 'imageUrl':
                jsxList.push(<img src={block.data.url} title={block.data.caption} alt={block.data.caption} style={{ maxWidth: '100%', height: 'auto' }} />)
                break;
            case 'image':
                if (block.data.file) {
                    if (block.data.file.url) {
                        jsxList.push(<img src={block.data.file.url} title={block.data.caption} alt={block.data.caption} style={{ maxWidth: '100%', height: 'auto' }} />)
                    }
                }
                break;
            case 'code':
                const codeHtml = "<pre><code class=\"hljs \">" + hljs.highlightAuto(block.data.code).value + "</code></pre>";
                jsxList.push(<Paragraph code={false}><div dangerouslySetInnerHTML={{ __html: codeHtml }} /></Paragraph>)
                if (block.data.code) textCount += block.data.code.replace(countRegexp, '').length;
                break;
            case 'list':
                let listJSX;
                if (block.data.style === 'unordered') {
                    listJSX = <ul>{block.data.items.map(i => <li dangerouslySetInnerHTML={{ __html: i }} />)}</ul>
                } else {
                    listJSX = <ol>{block.data.items.map(i => <li dangerouslySetInnerHTML={{ __html: i }} />)}</ol>
                }
                block.data.items.forEach(i => { if (i) textCount += i.replace(countRegexp, '').length })
                jsxList.push(<Paragraph >{listJSX}</Paragraph>)
                break;
            case 'embed':
                jsxList.push(
                    <>
                        {block.data.caption ? <Text strong>{block.data.caption}</Text> : <></>}
                        <Paragraph>
                            <iframe type="text/html" style={{ maxWidth: '100%', maxHeight: '500px', width: block.data.width, height: block.data.height }} src={block.data.embed} frameBorder={0} />
                        </Paragraph >
                    </>
                )
                break;
            case 'warning':
                jsxList.push(
                    <Alert
                        message={block.data.title}
                        description={block.data.message}
                        type="info"
                        showIcon
                        style={{ marginBottom: '14px' }}
                    />
                )
                if (block.data.title) {
                    textCount += block.data.title.replace(countRegexp, '').length;
                }
                if (block.data.message) {
                    textCount += block.data.message.replace(countRegexp, '').length;
                }
                break;
            case 'table':
                if (block.data.content.length === 0) jsxList.push(<></>)
                const columns = block.data.content[0].map((c, index) => {
                    return {
                        title: <span dangerouslySetInnerHTML={{ __html: c }} />,
                        dataIndex: c + index,
                        key: c + index,
                        render: c => <span dangerouslySetInnerHTML={{ __html: c }} />
                    }
                })
                const data = [];
                block.data.content.forEach((row, index) => {
                    if (index > 0) {
                        let row_data = { key: index }
                        row.forEach((d, d_index) => {
                            row_data = { ...row_data, [columns[d_index].key]: d }
                        });
                        data.push(row_data);
                    }
                })
                jsxList.push(
                    <Table tableLayout="fixed" size="middle" bordered columns={columns} dataSource={data} pagination={false} />
                )
                break;
            case 'quote':
                jsxList.push(
                    <>
                        <blockquote style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            paddingLeft: '15px',
                            borderLeft: '3px solid #ccc',
                            textAlign: block.data.alignment
                        }}>
                            <p dangerouslySetInnerHTML={{ __html: text }} />
                        </blockquote>
                        <cite dangerouslySetInnerHTML={{ __html: block.data.caption }} />
                    </>
                )
                if (block.data.caption) {
                    textCount += block.data.caption.replace(countRegexp, '').length;
                }
                if (text) {
                    textCount += text.replace(countRegexp, '').length;
                }
                break;
        }
    })
    return { text: jsxList, textCount: textCount }
}
